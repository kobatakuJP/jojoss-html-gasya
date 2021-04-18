<template>
  <div class="home">
    <SelectGasyaScene v-if="isSelectGasya" @pull="actionPull" />
    <ResultScene v-if="isResult" :result="result" @done="sceneDone" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectGasyaScene from "@/components/SelectGasyaScene.vue";
import ResultScene from "@/components/ResultScene.vue";
import { SCENE } from "../constants";

@Component({
  components: {
    SelectGasyaScene,
    ResultScene,
  },
})
export default class Home extends Vue {
  currentScene = SCENE.SELECT_GASYA;
  scenes = [SCENE.SELECT_GASYA, SCENE.RESULT]
  result = "";
  async actionPull(v: number) {
    const json = await this.gasya();
    this.result = json[0]["n"];
    this.currentScene = SCENE.RESULT;
  }
  async gasya() {
    const resp = await fetch("/.netlify/functions/gasya");
    return resp.json();
  }
  nextScene() {
    const nxt = this.scenes.findIndex(v => v === this.currentScene) + 1;
    this.currentScene = nxt >= this.scenes.length ? 0 : nxt;
  }
  sceneDone() {
    this.nextScene();
  }
  get isSelectGasya() {
    return this.currentScene === SCENE.SELECT_GASYA;
  }
  get isResult() {
    return this.currentScene === SCENE.RESULT;
  }
}
</script>
