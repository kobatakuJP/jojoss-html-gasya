<template>
  <div @click="onclick">{{result}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"

@Component
export default class ResultScene extends AbstractScene {
  @Prop() private result!: string;
  clickToDone = true;
}
</script>

<style scoped>
</style>
