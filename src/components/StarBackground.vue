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
export default class StarBackground extends BaseCanvasComponent {
  mounted(): void {
    this.draw();
  }
  draw() {
    this.drawCircle();
    this.drawStar();
  }
  drawCircle() {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(canW / 2, canH / 2, 600, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(71,64,57)";
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(canW / 2, canH / 2, 500, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(184,158,114)";
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(canW / 2, canH / 2, 400, 0, 2 * Math.PI);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "rgb(0,0,0)";
    this.ctx.stroke();
  }
  drawStar() {
    if (!this.ctx) return;
    const base = { x: canW / 2, y: canH / 2 };
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
}
</script>

<style scoped>
</style>
