<template>
  <div class="home">
    <SelectGasyaScene v-show="isSelectGasya" @pull="actionPull" />
    <ResultScene v-show="isResult"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectGasyaScene from "@/components/SelectGasyaScene.vue";
import ResultScene from "@/components/ResultScene.vue";
import {SCENE} from "../constants"

@Component({
  components: {
    SelectGasyaScene,
    ResultScene
  },
})
export default class Home extends Vue {
  scene: SCENE = SCENE.SELECT_GASYA;
  actionPull(v: number) {
    this.scene = SCENE.RESULT;
  }
  get isSelectGasya() {
    return this.scene === SCENE.SELECT_GASYA
  }
  get isResult() {
    return this.scene === SCENE.RESULT
  }
}
</script>
