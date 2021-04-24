<template>
  <div class="home">
    <component
      :is="currentScene"
      @done="sceneDone"
      :result="result"
      @pull="actionPull"
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

export type UnitInfo = {
  name: string;
  rarity: RARITY;
};
export enum RARITY {
  SSR = "SSR",
  SR = "SR",
  R = "R",
}

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
  result: UnitInfo[] = [];
  async actionPull(n: number): Promise<void> {
    const json: UnitInfo[] = await this.gasya(n);
    this.result = json;
    this.nextScene();
  }
  async gasya(n: number): Promise<UnitInfo[]> {
    const resp = await fetch(`/.netlify/functions/gasya?num=${n}`);
    return resp.json();
  }
  nextScene(): void {
    const nxt = this.scenes.findIndex((v) => v === this.currentScene) + 1;
    this.currentScene = this.scenes[nxt >= this.scenes.length ? 0 : nxt];
  }
  sceneDone(): void {
    this.nextScene();
  }
}
</script>
