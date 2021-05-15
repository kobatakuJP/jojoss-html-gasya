<template>
  <div class="parent100">
    <component
      :is="currentScene"
      @done="sceneDone"
      :result="result"
      @pull="actionPull"
      @gasyaTo="gasyaTo"
      :gasyaKind="currentGasyaKind"
    ></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectGasyaScene from "@/components/SelectGasyaScene.vue";
import PowaScene from "@/components/PowaScene.vue";
import PuncherAppearScene from "@/components/PuncherAppearScene.vue";
import PunchScene from "@/components/PunchScene.vue";
import LastPunchScene from "@/components/LastPunchScene.vue";
import PikaaScene from "@/components/PikaaScene.vue";
import ResultScene from "@/components/ResultScene.vue";
import {
  GASYA_KIND,
  GASYA_NUM,
  LOCALSTORAGE_KEYS,
  UnitInfo,
} from "@/constants";

@Component({
  components: {
    SelectGasyaScene,
    PowaScene,
    PuncherAppearScene,
    PunchScene,
    LastPunchScene,
    PikaaScene,
    ResultScene,
  },
})
export default class Home extends Vue {
  scenes = [
    "SelectGasyaScene",
    "PowaScene",
    "PuncherAppearScene",
    "PunchScene",
    "LastPunchScene",
    "PikaaScene",
    "ResultScene",
  ];
  currentScene = this.scenes[0];
  currentGasyaKind = GASYA_KIND.ZENBU;
  result: UnitInfo[] = [];
  async actionPull(n: GASYA_NUM): Promise<void> {
    const json: UnitInfo[] = await this.gasya(n);
    this.result = json;
    this.preloadPicture();
    this.nextScene();
  }
  async gasya(n: GASYA_NUM): Promise<UnitInfo[]> {
    const nextCount = this.getCurrentCount(this.currentGasyaKind, n) + 1;
    const kakutei = this.computeKakutei(this.currentGasyaKind, n, nextCount);
    const resp = await fetch(
      `/.netlify/functions/gasya?num=${n}&kind=${this.currentGasyaKind}&kakutei=${kakutei}`
    );
    this.updateCount(this.currentGasyaKind, n, nextCount);
    return resp.json();
  }
  getCurrentCount(kind: GASYA_KIND, n: GASYA_NUM): number {
    return (
      parseInt(localStorage.getItem(LOCALSTORAGE_KEYS[kind][n]) as string) || 0
    );
  }
  updateCount(kind: GASYA_KIND, n: GASYA_NUM, c: number): void {
    localStorage.setItem(LOCALSTORAGE_KEYS[kind][n], c + "");
  }
  computeKakutei(kind: GASYA_KIND, n: GASYA_NUM, c: number) {
    let result = 0;
    if (n === GASYA_NUM.ONE) {
      return result;
    } else if (n === GASYA_NUM.TEN) {
      result++; // 10連ならまず1つ
      switch (kind) {
        case GASYA_KIND.ZENBU:
        case GASYA_KIND.CHO_KORIN:
          if (c === 1 || c === 2 || c === 4 || c === 8 || c % 3 === 0) {
            result += 2; // 1,2,4,7,8,3の倍数で2枚確定（7は7の倍数側になる）
          }
          if (c % 5 === 0) {
            result++; // 5の倍数セット目で（本当は）ピックアップ確定
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
    }
    return result;
  }
  nextScene(): void {
    const nxt = this.scenes.findIndex((v) => v === this.currentScene) + 1;
    this.currentScene = this.scenes[nxt >= this.scenes.length ? 0 : nxt];
  }
  sceneDone(): void {
    this.nextScene();
  }
  gasyaTo(v: GASYA_KIND): void {
    this.currentGasyaKind = v;
  }
  preloadPicture(): void {
    for (let v of this.result) {
      const i = document.createElement("img");
      i.src = v.pictureurl;
    }
  }
}
</script>