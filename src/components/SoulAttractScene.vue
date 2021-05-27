<template>
  <div @click="onclick">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <SoulAttractComponent style="position: absolute" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";
import SoulAttractComponent from "@/components/SoulAttractComponent.vue";

@Component({
  components: {
    ResultSceneBackground,
    SoulAttractComponent,
  },
})
export default class LastPunchScene extends AbstractScene {
  clickToDone = true;
  //   timeoutForDone = 1000;
}
</script>

<style scoped>
</style>
