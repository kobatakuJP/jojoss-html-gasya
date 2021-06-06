<template>
  <div class="parent100">
    <WallBackground></WallBackground>
    <StarBackground></StarBackground>
    <!-- <SpotLightComponent></SpotLightComponent> -->
    <BasePowaComponent
      @endallanimation="endPowa"
      :targetRarity="this.result[0].rarity"
    ></BasePowaComponent>
    <div class="parent100 filter" :class="fade" @animationend="fadeEnd"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import WallBackground from "@/components/WallBackground.vue";
import BasePowaComponent from "@/components/BasePowaComponent.vue";
import StarBackground from "@/components/StarBackground.vue";

@Component({
  components: { WallBackground, BasePowaComponent, StarBackground },
})
export default class PowaScene extends AbstractScene {
  fade = "fadein";
  endPowa(): void {
    setTimeout(() => (this.fade = "fadeout"), 500);
  }
  fadeEnd(e: AnimationEvent): void {
    if (e.animationName.indexOf("fadeout") === 0) {
      this.done();
    }
  }
}
</script>

<style scoped>
.filter {
  position: absolute;
  left: 0;
  top: 0;
  background-color: black;
}
.fadein {
  animation: fadein 0.5s linear forwards;
}
.fadeout {
  animation: fadeout 0.5s ease-in forwards;
}
@keyframes fadein {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeout {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
