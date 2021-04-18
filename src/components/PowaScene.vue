<template>
  <div >ポワポワァ</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"

@Component
export default class PowaScene extends AbstractScene {
  timeoutForDone = 2000;
}
</script>

<style scoped>
</style>
