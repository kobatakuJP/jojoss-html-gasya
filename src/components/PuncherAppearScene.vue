<template>
  <div >スタープラチナ登場！</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"

@Component
export default class PuncherAppearScene extends AbstractScene {
  timeoutForDone = 1000;
}
</script>

<style scoped>
</style>
