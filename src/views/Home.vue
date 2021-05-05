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
import { GASYA_KIND, UnitInfo } from "@/constants";

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
  async actionPull(n: number): Promise<void> {
    const json: UnitInfo[] = await this.gasya(n);
    this.result = json;
    this.nextScene();
  }
  async gasya(n: number): Promise<UnitInfo[]> {
    const resp = await fetch(`/.netlify/functions/gasya?num=${n}&kind=${this.currentGasyaKind}`);
    return resp.json();
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
}
</script>