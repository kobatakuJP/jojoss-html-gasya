<template>
  <div class="parent100">
    <WallBackground :rarity="currenRarity"></WallBackground>
    <BasePowaComponent></BasePowaComponent>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import WallBackground from "@/components/WallBackground.vue";
import BasePowaComponent from "@/components/BasePowaComponent.vue";

@Component({
  components: { WallBackground, BasePowaComponent },
})
export default class PowaScene extends AbstractScene {
  timeoutForDone = 3000;
}
</script>

<style scoped>
</style>
