<template>
  <div @click="onclick">
    <ul>
      <li v-for="(unit, i) in result" :key="i">{{ unit.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import { UnitInfo } from "@/views/Home.vue";

@Component
export default class ResultScene extends AbstractScene {
  @Prop() private result!: UnitInfo[];
  clickToDone = true;
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
