<template>
  <BaseCanvasComponent ref="can"></BaseCanvasComponent>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RARITY } from "@/views/Home.vue";
import BaseCanvasComponent, {
  canW,
  canH,
} from "@/components/BaseCanvasComponent.vue";

@Component({ components: { BaseCanvasComponent } })
export default class WallBackground extends BaseCanvasComponent {
  readonly diaW: number;
  readonly diaH: number;
  constructor() {
    super();
    this.diaW = canW / 9;
    this.diaH = this.diaW * 2;
  }
  mounted(): void {
    this.draw();
  }
  draw() {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(96,63,32)";
    this.ctx.fillRect(0, 0, canW, canH);
    this.drawGrid();
    this.ctx.beginPath();
    this.ctx.arc(825, 1237.5, 600, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(71,64,57)";
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(825, 1237.5, 500, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(184,158,114)";
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(825, 1237.5, 400, 0, 2 * Math.PI);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "rgb(0,0,0)";
    this.ctx.stroke();
    // star start
    this.drawStar();
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
  drawStar() {
    if (!this.ctx) return;
    const base = { x: 825, y: 1237.5 };
    const hankei = 670;
    const points = [
      { x: 0.0, y: 0.0 },
      { x: 0.0, y: -1.0 },
      { x: 0.2245, y: -0.309 },
      { x: 0.9511, y: -0.309 },
      { x: 0.3633, y: 0.118 },
      { x: 0.5878, y: 0.809 },
      { x: 0.0, y: 0.382 },
      { x: -0.5878, y: 0.809 },
      { x: -0.3633, y: 0.118 },
      { x: -0.9511, y: -0.309 },
      { x: -0.2245, y: -0.309 },
      { x: 0.0, y: -1.0 },
      { x: 0.2245, y: -0.309 },
    ]; // from https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q10137274530
    this.ctx.beginPath();
    this.ctx.moveTo(base.x, base.y);
    // 指定した頂点までlintToする使い捨て関数
    const line = (i: number) =>
      this.ctx?.lineTo(
        base.x + points[i].x * hankei,
        base.y + points[i].y * hankei
      );
    line(0);
    line(1);
    line(2);
    line(0);
    line(3);
    line(4);
    line(0);
    line(5);
    line(6);
    line(0);
    line(7);
    line(8);
    line(0);
    line(9);
    line(10);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgb(166,146,114)";
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(base.x, base.y);
    line(0);
    line(2);
    line(3);
    line(0);
    line(4);
    line(5);
    line(0);
    line(6);
    line(7);
    line(0);
    line(8);
    line(9);
    line(0);
    line(10);
    line(11);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgb(184,166,136)";
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }
  degToRad(d: number): number {
    return d * (Math.PI / 180);
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
