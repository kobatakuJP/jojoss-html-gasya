<template>
  <!-- widthは11と3の公倍数。heightはその1.5倍。大きめの値にして解像度不足にならないようにする。 -->
  <canvas width="1650" height="2475" class="background-canvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
export const canW = 1650;
export const canH = 2475;
@Component
export default class BaseCanvasComponent extends Vue {
  ctx: CanvasRenderingContext2D | null = null;
  mounted() {
    this.ctx = (this.$el as HTMLCanvasElement).getContext("2d");
  }
}
</script>

<style scoped>
.background-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
</style>
