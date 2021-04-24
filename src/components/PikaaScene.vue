<template>
  <div>ピカー</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"

@Component
export default class PikaaScene extends AbstractScene {
  timeoutForDone = 2000;
}
</script>

<style scoped>
</style>
