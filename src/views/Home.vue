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
  async actionPull(
    n: GASYA_NUM,
    kakutei: number,
    pu: number,
    gensen: number
  ): Promise<void> {
    const json: UnitInfo[] = await this.gasya(n, kakutei, pu, gensen);
    this.result = json;
    this.preloadPicture();
    this.nextScene();
  }
  async gasya(
    n: GASYA_NUM,
    kakutei: number,
    pu: number,
    gensen: number
  ): Promise<UnitInfo[]> {
    const nextCount = this.getCurrentCount(this.currentGasyaKind, n) + 1;
    const resp = await fetch(
      `/.netlify/functions/gasya?num=${n}&kind=${this.currentGasyaKind}&kakutei=${kakutei}&pu=${pu}&gensen=${gensen}`
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