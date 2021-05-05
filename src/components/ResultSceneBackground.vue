<template>
  <BaseCanvasComponent ref="can" :style="styleObj"></BaseCanvasComponent>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { RARITY } from "@/constants";
import BaseCanvasComponent, {
  canW,
  canH,
} from "@/components/BaseCanvasComponent.vue";

@Component({ components: { BaseCanvasComponent } })
export default class ResultSceneBackground extends BaseCanvasComponent {
  @Prop() private rarity!: RARITY;
  readonly diaW: number;
  readonly diaH: number;
  readonly ssrColor = "rgb(226,229,180)";
  readonly srColor = "rgb(240,198,75)";
  readonly rColor = "rgb(149,201,202)";
  constructor() {
    super();
    this.diaW = canW / 11;
    this.diaH = (this.diaW * 9) / 7;
  }
  styleObj = {
    backgroundColor: this.backgroundColor,
  };
  get backgroundColor(): string {
    switch (this.rarity) {
      case RARITY.SSR:
        return this.ssrColor;
      case RARITY.SR:
        return this.srColor;
      default:
        return this.rColor;
    }
  }
  mounted(): void {
    this.draw();
  }
  draw(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, canW, canH);
    switch (this.rarity) {
      case RARITY.SSR:
        this.ssrDraw();
        break;
      case RARITY.SR:
        this.srDraw();
        break;
      default:
        this.rDraw();
    }
  }
  rDraw(): void {
    this.drawGrid(false);
  }
  srDraw(): void {
    this.drawGrid(false);
  }
  ssrDraw(): void {
    this.drawSSRLine();
    this.drawGrid(true);
  }
  // drawBack() {
  //   if (!this.ctx) return;
  //   this.ctx.fillStyle = this.backgroundColor;
  //   this.ctx.fillRect(0, 0, this.canW, this.canH);
  // }
  drawGrid(isBorder: boolean): void {
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
    this.ctx.fillStyle = "rgba(0,0,0,0.15)";
    this.ctx.fill();
    if (isBorder) {
      this.ctx.lineWidth = 10;
      this.ctx.strokeStyle = "rgba(255,255,255,0.8)";
      this.ctx.stroke();
    }
  }
  drawSSRLine(): void {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(171,233,204)";
    this.ctx.fillRect(92, 0, 20, canH);
    this.ctx.fillStyle = "rgb(234,99,155)";
    this.ctx.fillRect(182, 0, 45, canH);
    this.ctx.fillStyle = "rgb(118,183,193)";
    this.ctx.fillRect(227, 0, 95, canH);
    this.ctx.fillStyle = "rgb(176,107,184)";
    this.ctx.fillRect(503, 0, 21, canH);
    this.ctx.fillStyle = "rgb(238,151,219)";
    this.ctx.fillRect(631, 0, 20, canH);
    this.ctx.fillStyle = "rgb(208,120,84)";
    this.ctx.fillRect(1145, 0, 22, canH);
    this.ctx.fillStyle = "rgb(245,188,217)";
    this.ctx.fillRect(1322, 0, 45, canH);
    this.ctx.fillStyle = "rgb(90,179,188)";
    this.ctx.fillRect(1373, 0, 96, canH);
    this.ctx.fillStyle = "rgb(241,156,196)";
    this.ctx.fillRect(1476, 0, 24, canH);
    this.ctx.fillStyle = "rgb(171,233,204)";
    this.ctx.fillRect(1543, 0, 28, canH);
  }
}
</script>

<style scoped>
</style>
