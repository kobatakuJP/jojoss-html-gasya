<template>
  <div>
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <div class="pikaa">ピカー</div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"
import ResultSceneBackground from "@/components/ResultSceneBackground.vue"

@Component({
  components: {
    ResultSceneBackground
  }
})
export default class PikaaScene extends AbstractScene {
  timeoutForDone = 2000;
}
</script>

<style scoped>
.pikaa {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
