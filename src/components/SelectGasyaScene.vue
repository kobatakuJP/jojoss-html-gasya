<template>
  <div class="hello">
    <div><button @click="pullGasha(1)">ガシャを引く!💎0個消費</button></div>
    <div><button @click="pullGasha(10)">10回!!ガシャを引く!💎0個消費</button></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SelectGasyaScene extends Vue {
  @Prop() private msg!: string;
  pullGasha(v: number) {
    this.$emit("pull", v);
  }
}
</script>

<style scoped>
</style>
