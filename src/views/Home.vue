<template>
  <div class="home">
    <SelectGasyaScene v-show="isSelectGasya" @pull="actionPull" />
    <ResultScene v-show="isResult" :result="result" />
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
  scene: SCENE = SCENE.SELECT_GASYA;
  result = "";
  async actionPull(v: number) {
    const json = await this.gasya();
    this.result = json[0]["n"];
    this.scene = SCENE.RESULT;
  }
  async gasya() {
    const resp = await fetch("/.netlify/functions/gasya");
    return resp.json();
  }
  get isSelectGasya() {
    return this.scene === SCENE.SELECT_GASYA;
  }
  get isResult() {
    return this.scene === SCENE.RESULT;
  }
}
</script>
