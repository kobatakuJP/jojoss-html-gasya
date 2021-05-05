<template>
  <div>
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <StarBackground :isBreak="true" @breaked="done"></StarBackground>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";
import StarBackground from "@/components/StarBackground.vue";

@Component({
  components: {
    ResultSceneBackground,
    StarBackground,
  },
})
export default class PikaaScene extends AbstractScene {}
</script>

<style scoped>
.pikaa {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
