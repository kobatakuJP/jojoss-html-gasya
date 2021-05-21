<template>
  <div class="parent100 noselect">
    <div class="gasya-banner-container">
      <v-btn height="100%" x-small @click="gasyaTo(0)">
        <span v-show="gasyaKind === 0">★</span>ダイヤガシャ1
      </v-btn>
      <v-btn height="100%" x-small @click="gasyaTo(1)">
        <span v-show="gasyaKind === 1">★</span>ダイヤガシャ2
      </v-btn>
      <v-btn height="100%" x-small @click="gasyaTo(2)">
        <span v-show="gasyaKind === 2">★</span>ダイヤガシャ3
      </v-btn>
      <v-btn height="100%" x-small @click="gasyaTo(3)">
        <span v-show="gasyaKind === 3">★</span>ダイヤガシャ4
      </v-btn>
    </div>
    <div style="height: 95%">
      <div style="font-weight: bold">ダイヤガシャ</div>
      <div ref="pc" class="pc" @click="pcClick">
        パソコン<br />
        10回ガシャはSSR1枚確定ィィィ！
        <br />
        {{ message }}
      </div>
      <div class="gasya-button ikkai" @click="pullGasha(one)">
        <SingleGasyaButtonComponent
          :count="nextSinCount"
        ></SingleGasyaButtonComponent>
      </div>
      <div class="spacer"></div>
      <div class="gasya-button jukkai" @click="pullGasha(ten)">
        <SetGasyaButtonComponent :count="next10Count"></SetGasyaButtonComponent>
      </div>
      <div class="gasya-description">
        <kakutei-msg-component :msg="kakuteiMsg" />
      </div>
      <div class="gasya-description">
        <kakutei-desc-component />
      </div>
      <had-unit-list-component :ssrUnits="ssrUnits" :ssrNums="ssrNums" />
    </div>
    <div class="overlay-all">
      <div class="version">version:{{ version }}</div>
      <v-btn
        class="ma-2 menu-btn"
        text
        icon
        color="red lighten-2"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-dots-vertical-circle-outline </v-icon>
      </v-btn>
      <v-navigation-drawer v-model="drawer" right absolute temporary>
        <drawer-contents-component></drawer-contents-component>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SingleGasyaButtonComponent from "@/components/SingleGasyaButtonComponent.vue";
import SetGasyaButtonComponent from "@/components/SetGasyaButtonComponent.vue";
import SNSShareButtonsComponent from "@/components/SNSShareButtonsComponent.vue";
import DrawerContentsComponent from "@/components/DrawerContentsComponent.vue";
import KakuteiMsgComponent from "@/components/KakuteiMsgComponent.vue";
import KakuteiDescComponent from "@/components/KakuteiDescComponent.vue";
import {
  GASYA_KIND,
  GASYA_NUM,
  LOCALSTORAGE_KEYS,
  UnitInfo,
} from "@/constants";
import HadUnitListComponent from "@/components/HadUnitListComponent.vue";

/** localstorageから特定のガシャのカウント情報を取得 */
function getCountFromLS(kind: GASYA_KIND, n: GASYA_NUM): number {
  return (
    parseInt(localStorage.getItem(LOCALSTORAGE_KEYS[kind][n]) as string) || 0
  );
}

@Component({
  components: {
    SingleGasyaButtonComponent,
    SetGasyaButtonComponent,
    SNSShareButtonsComponent,
    DrawerContentsComponent,
    KakuteiMsgComponent,
    KakuteiDescComponent,
    HadUnitListComponent,
  },
})
export default class SelectGasyaScene extends Vue {
  @Prop() gasyaKind!: GASYA_KIND;
  @Prop() ssrUnits!: UnitInfo[];
  @Prop() ssrNums!: number[];
  readonly version = process.env.VUE_APP_GIT_COMMIT_HASH;
  readonly one = GASYA_NUM.ONE;
  readonly ten = GASYA_NUM.TEN;
  pcCount = 0;
  drawer = false;
  message = "夢の全部入りガシャ！";
  readonly counts = {
    [GASYA_KIND.ZENBU]: {
      sin: getCountFromLS(GASYA_KIND.ZENBU, GASYA_NUM.ONE),
      set: getCountFromLS(GASYA_KIND.ZENBU, GASYA_NUM.TEN),
    },
    [GASYA_KIND.CHO_KORIN]: {
      sin: getCountFromLS(GASYA_KIND.CHO_KORIN, GASYA_NUM.ONE),
      set: getCountFromLS(GASYA_KIND.CHO_KORIN, GASYA_NUM.TEN),
    },
    [GASYA_KIND.KORIN]: {
      sin: getCountFromLS(GASYA_KIND.KORIN, GASYA_NUM.ONE),
      set: getCountFromLS(GASYA_KIND.KORIN, GASYA_NUM.TEN),
    },
    [GASYA_KIND.JOJOFES]: {
      sin: getCountFromLS(GASYA_KIND.JOJOFES, GASYA_NUM.ONE),
      set: getCountFromLS(GASYA_KIND.JOJOFES, GASYA_NUM.TEN),
    },
  };
  get nextSinCount(): number {
    return (this.counts[this.gasyaKind]?.sin || 0) + 1;
  }
  get next10Count(): number {
    return (this.counts[this.gasyaKind]?.set || 0) + 1;
  }
  get kakuteiNum(): number {
    let result = 1; // 10連ならまず1つ
    const c = this.next10Count;
    switch (this.gasyaKind) {
      case GASYA_KIND.ZENBU:
      case GASYA_KIND.CHO_KORIN:
        if (c === 1 || c === 2 || c === 4 || c === 8 || c % 3 === 0) {
          result += 2; // 1,2,4,7,8,3の倍数で2枚確定（7は7の倍数側になる）
        }
        if (c % 7 === 0) {
          result = GASYA_NUM.TEN;
        }
        break;
      case GASYA_KIND.KORIN:
      case GASYA_KIND.JOJOFES:
        if (c % 2 === 0) {
          result += 2; // 2の倍数セット目で2枚確定
        }
        break;
      default:
      // 特になし
    }
    return result;
  }
  /** ピックアップ数 */
  get puNum(): number {
    switch (this.gasyaKind) {
      case GASYA_KIND.ZENBU:
      case GASYA_KIND.CHO_KORIN:
        return this.next10Count % 5 === 0 ? 1 : 0;
      default:
        return 0;
    }
  }
  /** 厳選ユニット確定 */
  get gensenNum(): number {
    switch (this.gasyaKind) {
      case GASYA_KIND.ZENBU:
      case GASYA_KIND.CHO_KORIN:
        return this.next10Count % 10 === 0 ? 1 : 0;
      default:
        return 0;
    }
  }
  get kakuteiMsg(): string {
    switch (this.gasyaKind) {
      case GASYA_KIND.ZENBU:
      case GASYA_KIND.CHO_KORIN: {
        if (this.kakuteiNum < 2 && this.gensenNum === 0 && this.puNum === 0) {
          return "10の倍数セット目で厳選ユニット確定ッ！";
        }
        const msgs = [];
        if (this.gensenNum > 0) msgs.push(`厳選${this.gensenNum}枚`);
        if (this.puNum > 0) msgs.push(`ピックアップ${this.puNum}枚`);
        msgs.push(`SSR${this.kakuteiNum}枚`);
        return msgs.join("&") + "確定中ッ！";
      }
      case GASYA_KIND.KORIN:
      case GASYA_KIND.JOJOFES:
        if (this.kakuteiNum < 2) {
          return "2の倍数セット目でSSR2枚以上確定ッ！";
        }
        return `SSR${this.kakuteiNum}枚確定中ッ！`;
      default:
        return "";
    }
  }
  @Watch("gasyaKind")
  changeKind(val: GASYA_KIND): void {
    switch (val) {
      case GASYA_KIND.ZENBU:
        this.message = "夢の全部入りガシャ！";
        break;
      case GASYA_KIND.CHO_KORIN:
        this.message = "超降臨ガシャ！";
        break;
      case GASYA_KIND.KORIN:
        this.message = "降臨ガシャ！";
        break;
      case GASYA_KIND.JOJOFES:
        this.message = "ジョジョフェスッ！";
        break;
    }
  }
  mounted(): void {
    this.changeKind(this.gasyaKind);
  }
  gasyaTo(v: GASYA_KIND): void {
    this.$emit("gasyaTo", v);
  }
  pullGasha(v: GASYA_NUM): void {
    if (v === this.one) {
      this.$emit("pull", v, 0, 0, 0);
    } else if (v === this.ten) {
      this.$emit("pull", v, this.kakuteiNum, this.puNum, this.gensenNum);
    }
  }
  pcClick(): void {
    this.pcCount++;
    if (this.pcCount === 10) {
      this.message = "カタカタカタッターン";
      setTimeout(() => {
        this.message = "バタムッ！";
        (this.$refs.pc as Element).classList.add("bucha");
      }, 1000);
    }
  }
}
</script>

<style scoped>
.version {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 1rem;
  font-weight: bold;
}
.menu-btn {
  position: absolute;
  right: 0;
  pointer-events: visible;
}
.overlay-all {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  pointer-events: none;
}
.gasya-banner-container {
  height: 5%;
  background-color: rgb(81, 58, 52);
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}
.gasya-banner-container::-webkit-scrollbar {
  display: none;
}
.gasya-banner {
  height: 100%;
  font-size: 0.8rem;
}
.gasya-button {
  display: flex;
  width: 90%;
  height: 10%;
  vertical-align: middle;
  margin: auto;
  border: ridge;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
  cursor: pointer;
}
.gasya-button.ikkai {
  border-color: rgb(150, 106, 74);
}
.gasya-button.jukkai {
  border-color: rgb(83, 41, 27);
}
.gasya-description {
  display: flex;
  width: 90%;
  height: 5%;
  vertical-align: middle;
  margin: auto;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}
.no-border {
  border: none;
}
.spacer {
  margin: 10%;
}
.pc {
  width: 90%;
  height: 30%;
  background-color: rgb(76, 75, 135);
  color: white;
  display: flex;
  margin: auto;
  border: ridge;
  justify-content: center; /*左右中央揃え*/
  cursor: pointer;
}
.pc.bucha {
  background: no-repeat center/100% url(../assets/bucha.jpg) rgba(0, 0, 0, 0);
}
.noselect {
  user-select: none;
}
</style>
