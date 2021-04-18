<template>
  <div>オラァ！</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"

@Component
export default class LastPunchScene extends AbstractScene {
  timeoutForDone = 1000;
}
</script>

<style scoped>
</style>
