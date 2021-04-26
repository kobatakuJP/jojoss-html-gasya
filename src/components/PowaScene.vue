<template>
  <div>
    <WallBackground :rarity="currenRarity"></WallBackground>
    <div style="position: fixed; color: white">ポワポワァ</div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import WallBackground from "@/components/WallBackground.vue"

@Component({
  components: {WallBackground}
})
export default class PowaScene extends AbstractScene {
  timeoutForDone = 3000;
}
</script>

<style scoped>
</style>
