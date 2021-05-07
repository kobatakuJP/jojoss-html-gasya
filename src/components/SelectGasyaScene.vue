<template>
  <div class="parent100 noselect">
    <div style="height: 5%; background-color: rgb(81, 58, 52)">
      <v-btn height="100%" x-small @click="gasyaTo(0)">
        <span v-show="gasyaKind === 0">★</span>ダイヤガシャ1
      </v-btn>
      <v-btn height="100%" x-small @click="gasyaTo(1)">
        <span v-show="gasyaKind === 1">★</span>ダイヤガシャ2
      </v-btn>
      <v-btn height="100%" x-small @click="gasyaTo(2)">
        <span v-show="gasyaKind === 2">★</span>ダイヤガシャ3
      </v-btn>
    </div>
    <div style="height: 95%">
      <div style="font-weight: bold">ダイヤガシャ</div>
      <div ref="pc" class="pc" @click="pcClick">
        パソコン<br /><br /><br />
        {{ message }}
      </div>
      <div class="gasya-button ikkai" @click="pullGasha(1)">
        <SingleGasyaButtonComponent></SingleGasyaButtonComponent>
      </div>
      <div class="spacer"></div>
      <div class="gasya-button jukkai" @click="pullGasha(10)">
        <SetGasyaButtonComponent></SetGasyaButtonComponent>
      </div>
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
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Share </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <SNSShareButtonsComponent
              msg="【ガシャを引こう！】ジョジョSSサ終を偲び、ガシャをHTMLで再現中ゥゥゥ！無料で引けるぞッ！"
            ></SNSShareButtonsComponent>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Like </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <iframe
              src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fjojoss-html-gasya.netlify.app%2F&width=130&layout=button_count&action=like&size=small&share=false&height=21&appId"
              width="130"
              height="21"
              style="border: none; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Past Version </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <a
              href="https://607c3e5045487400083dba39--jojoss-html-gasya.netlify.app/"
              target="_blank"
              rel="noopener"
              >Ver 0.1.4</a
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SingleGasyaButtonComponent from "@/components/SingleGasyaButtonComponent.vue";
import SetGasyaButtonComponent from "@/components/SetGasyaButtonComponent.vue";
import SNSShareButtonsComponent from "@/components/SNSShareButtonsComponent.vue";
import { GASYA_KIND } from "@/constants";

@Component({
  components: {
    SingleGasyaButtonComponent,
    SetGasyaButtonComponent,
    SNSShareButtonsComponent,
  },
})
export default class SelectGasyaScene extends Vue {
  version = process.env.VUE_APP_GIT_COMMIT_HASH;
  pcCount = 0;
  drawer = false;
  @Prop() gasyaKind!: GASYA_KIND;
  message = "夢の全部入りガシャ！";
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
    }
  }
  mounted(): void {
    this.changeKind(this.gasyaKind);
  }
  gasyaTo(v: GASYA_KIND): void {
    this.$emit("gasyaTo", v);
  }
  pullGasha(v: number): void {
    this.$emit("pull", v);
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
  height: 100vh;
  pointer-events: none;
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
