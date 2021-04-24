<template>
  <div @click="onclick">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <ul>
      <li v-for="(unit, i) in result" :key="i">{{ unit.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";

@Component({
  components: {
    ResultSceneBackground,
  },
})
export default class ResultScene extends AbstractScene {
  clickToDone = true;
}
</script>

<style scoped>
ul {
  position: absolute;
  left: 0;
  right: 0;
}
li {
  list-style: none;
}
</style>
