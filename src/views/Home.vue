<template>
  <div class="parent100">
    <component
      :is="currentScene"
      :result="result"
      :gasyaKind="currentGasyaKind"
      :ssrUnits="ssrUnits"
      :ssrNums="ssrNums"
      @done="sceneDone"
      @pull="actionPull"
      @gasyaTo="gasyaTo"
      @removeUnits="resetSSRNums"
    ></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { units } from "../lambda/submodule/unitData";
import SelectGasyaScene from "@/components/SelectGasyaScene.vue";
import PowaScene from "@/components/PowaScene.vue";
import PuncherAppearScene from "@/components/PuncherAppearScene.vue";
import PunchScene from "@/components/PunchScene.vue";
import LastPunchScene from "@/components/LastPunchScene.vue";
import PikaaScene from "@/components/PikaaScene.vue";
import ResultScene from "@/components/ResultScene.vue";
import BitethedustScene from "@/components/BitethedustScene.vue";
import SoulAttractScene from "@/components/SoulAttractScene.vue";
import {
  GasyaResultUnit,
  GASYA_KIND,
  GASYA_NUM,
  LOCALSTORAGE_KEYS,
  RARITY,
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
    BitethedustScene,
    SoulAttractScene,
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
    // "BitethedustScene", TODO バイツァ実装時にアンコメント
    "SoulAttractScene",
  ];
  currentScene = this.scenes[0];
  currentGasyaKind = GASYA_KIND.ZENBU;
  result: GasyaResultUnit[] = [];
  ssrUnits = units.filter((v) => v.rarity === RARITY.SSR);
  /** SSRの所持数一覧、localstorageになければSSRの配列長で0埋め */
  ssrNums: number[] = localStorage.getItem(LOCALSTORAGE_KEYS.SSR_NUMS)
    ? (JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEYS.SSR_NUMS) as string
      ) as number[])
    : Array(this.ssrUnits.length).fill(0);
  async actionPull(
    n: GASYA_NUM,
    kakutei: number,
    pu: number,
    gensen: number
  ): Promise<void> {
    const json: GasyaResultUnit[] = await this.gasya(n, kakutei, pu, gensen);
    json.forEach(this.addNew);
    this.result = json;
    this.preloadPicture();
    this.nextScene();
  }
  async gasya(
    n: GASYA_NUM,
    kakutei: number,
    pu: number,
    gensen: number
  ): Promise<GasyaResultUnit[]> {
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
  @Watch("result")
  updateSSRNums(): void {
    this.result.forEach((v) => {
      const idx = this.ssrUnits.findIndex((t) => t.name === v.name);
      this.ssrNums[idx] += 1; // TODO バイツァ実装時は修正要
      this.ssrNums[idx] += v.p1 ? 1 : 0; // +1
    });
    this.persistentSSRNums();
  }
  resetSSRNums() {
    this.ssrNums = Array(this.ssrUnits.length).fill(0);
    this.persistentSSRNums();
  }
  persistentSSRNums() {
    localStorage.setItem(
      LOCALSTORAGE_KEYS.SSR_NUMS,
      JSON.stringify(this.ssrNums)
    );
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
  addNew(v: GasyaResultUnit) {
    const idx = this.ssrUnits.findIndex((t) => t.name === v.name);
    if (this.ssrNums[idx] === 0) v.new = true;
  }
  preloadPicture(): void {
    for (let v of this.result) {
      const i = document.createElement("img");
      i.src = v.pictureurl;
    }
  }
}
</script>