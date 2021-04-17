<template>
  <div class="hello">
    <button @click="pullGasha">ガシャを引く</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GASYA_KIND } from "../constants";

@Component
export default class SelectGasyaScene extends Vue {
  @Prop() private msg!: string;
  pullGasha() {
    this.$emit("pull", GASYA_KIND.SIMPLE);
  }
}
</script>

<style scoped>
</style>
