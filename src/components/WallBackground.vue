<template>
  <BaseCanvasComponent ref="can"></BaseCanvasComponent>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseCanvasComponent, {
  canW,
  canH,
} from "@/components/BaseCanvasComponent.vue";

@Component({ components: { BaseCanvasComponent } })
export default class WallBackground extends BaseCanvasComponent {
  readonly diaW = canW / 9;
  readonly diaH = this.diaW * 2;
  mounted(): void {
    this.draw();
  }
  draw(): void {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(96,63,32)";
    this.ctx.fillRect(0, 0, canW, canH);
    this.drawGrid();
  }
  drawGrid(): void {
    if (!this.ctx) return;
    this.ctx.beginPath();
    for (let sw = 0; sw < canW + this.diaW; sw += this.diaW) {
      for (let sh = 0; sh < canH + this.diaH; sh += this.diaH) {
        this.ctx.moveTo(sw, sh);
        this.ctx.lineTo(sw + this.diaW / 2, sh + this.diaH / 2);
        this.ctx.lineTo(sw, sh + this.diaH);
        this.ctx.lineTo(sw - this.diaW / 2, sh + this.diaH / 2);
        this.ctx.closePath();
      }
    }
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = "rgb(102,71,37)";
    this.ctx.stroke();
  }
}
</script>

<style scoped>
</style>
