<template>
  <div @click="onclick">
    <ul>
      <li v-for="(unit, i) in result" :key="i">{{ unit }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";

@Component
export default class ResultScene extends AbstractScene {
  @Prop() private result!: string;
  clickToDone = true;
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
