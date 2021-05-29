<template>
  <div @click="onclick" class="parent100">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <AwaikenUnitsComponent
      style="position: absolute"
      :result="result"
      @done="done"
      v-if="!attracting"
    />
    <transition name="fade">
      <SoulAttractComponent
        style="position: absolute"
        v-show="attracting"
        @done="attracting = false"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";
import SoulAttractComponent from "@/components/SoulAttractComponent.vue";
import AwaikenUnitsComponent from "@/components/AwaikenUnitsComponent.vue";

@Component({
  components: {
    ResultSceneBackground,
    SoulAttractComponent,
    AwaikenUnitsComponent,
  },
})
export default class SoulAttractScene extends AbstractScene {
  attracting = true;
  // clickToDone = true;
  //   timeoutForDone = 1000;
}
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
