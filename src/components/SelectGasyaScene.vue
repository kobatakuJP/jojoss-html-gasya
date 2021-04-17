<template>
  <div class="hello">
    <button>ガシャを引く</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectGasyaScene extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped>
</style>
