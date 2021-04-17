<template>
  <div class="hello">
    <button @click="pullGasha">ガシャを引く</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectGasyaScene extends Vue {
  @Prop() private msg!: string;
  pullGasha() {
    this.$emit("pull", 1)
  }
}
</script>

<style scoped>
</style>
