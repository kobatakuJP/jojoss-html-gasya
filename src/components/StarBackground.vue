<template>
  <BaseCanvasComponent ref="can" :class="anim" @animationend="removeAnim">
  </BaseCanvasComponent>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseCanvasComponent, {
  canW,
  canH,
} from "@/components/BaseCanvasComponent.vue";

@Component({ components: { BaseCanvasComponent } })
export default class StarBackground extends BaseCanvasComponent {
  @Prop() isBreak!: boolean;
  anim = "";
  mounted(): void {
    this.draw();
  }
  draw() {
    this.drawCircle();
    this.drawStar();
    if (this.isBreak) {
      ((this.$refs.can as Vue).$el as HTMLElement).addEventListener(
        "animationend",
        this.removeAnim
      );
      this.anim = "dropin";
      this.startBreakAnim();
    }
  }
  removeAnim(e: AnimationEvent) {
    this.anim = "";
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
  startBreakAnim() {
    this.drawFlashBase();
    setTimeout(() => {
      this.anim = "buruburu";
      this.drawHibi1();
      setTimeout(() => {
        this.anim = "";
        this.anim = "buruburu";
        this.drawHibi2(20);
        setTimeout(() => {
          this.anim = "buruburu";
          this.drawHibi3();
          setTimeout(() => {
            this.explosion();
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  }
  drawFlashBase() {
    if (!this.ctx) return;
    const lineWidth = 40;
    this.ctx.beginPath();
    this.ctx.arc(canW / 2, canH / 2, 600, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "rgb(245,244,212)";
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(245,244,212, 0.4)";
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(canW / 2, canH / 2, 600 + lineWidth / 2, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "rgb(234,220,145)";
    this.ctx.lineWidth = 10;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(canW / 2, canH / 2, 600 - lineWidth / 2, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "rgb(234,220,145)";
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
  }
  drawHibi1() {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 - 180, canH / 2 + 100);
    this.ctx.lineTo(canW / 2 - 250, canH / 2 + 90);
    this.ctx.lineTo(canW / 2 - 350, canH / 2 + 200);
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 + 50, canH / 2 - 100);
    this.ctx.lineTo(canW / 2 + 80, canH / 2 - 200);
    this.ctx.lineTo(canW / 2 + 120, canH / 2 - 300);
    this.ctx.strokeStyle = "rgb(245,244,212)";
    this.ctx.lineWidth = 10;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(0, 40);
    this.ctx.lineTo(0, 300);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW, 1500);
    this.ctx.lineTo(canW, 2000);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgba(245,244,212, 0.4)";
    this.ctx.fill();
  }
  drawHibi2(w: number) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 - 180, canH / 2 + 100);
    this.ctx.lineTo(canW / 2 - 250, canH / 2 + 90);
    this.ctx.lineTo(canW / 2 - 350, canH / 2 + 200);
    this.ctx.lineTo(canW / 2 - 400, canH / 2 + 200);
    this.ctx.lineTo(canW / 2 - 500, canH / 2 + 300);
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 + 50, canH / 2 - 100);
    this.ctx.lineTo(canW / 2 + 80, canH / 2 - 200);
    this.ctx.lineTo(canW / 2 + 120, canH / 2 - 300);
    this.ctx.lineTo(canW / 2 + 200, canH / 2 - 400);
    this.ctx.lineTo(canW / 2 + 220, canH / 2 - 550);
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 - 150, canH / 2 - 200);
    this.ctx.lineTo(canW / 2 - 300, canH / 2 - 200);
    this.ctx.lineTo(canW / 2 - 400, canH / 2 - 290);
    this.ctx.lineTo(canW / 2 - 500, canH / 2 - 300);
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 + 200, canH / 2 + 200);
    this.ctx.lineTo(canW / 2 + 300, canH / 2 + 400);
    this.ctx.lineTo(canW / 2 + 400, canH / 2 + 450);
    this.ctx.strokeStyle = "rgb(245,244,212)";
    this.ctx.lineWidth = w;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(0, 2000);
    this.ctx.lineTo(0, 2300);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(900, 0);
    this.ctx.lineTo(1100, 0);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW, 500);
    this.ctx.lineTo(canW, 800);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgba(245,244,212, 0.4)";
    this.ctx.fill();
  }
  drawHibi3() {
    if (!this.ctx) return;
    this.drawHibi2(30);
    this.ctx.beginPath();
    this.ctx.moveTo(500, 1000);
    this.ctx.lineTo(450, 1200);
    this.ctx.lineTo(500, 1400);
    this.ctx.lineTo(600, 1600);
    this.ctx.lineTo(550, 1750);
    this.ctx.moveTo(470, 1300);
    this.ctx.lineTo(300, 1400);
    this.ctx.lineTo(250, 1400);
    this.ctx.moveTo(900, 1100);
    this.ctx.lineTo(1200, 1000);
    this.ctx.lineTo(1220, 900);
    this.ctx.lineTo(1100, 900);
    this.ctx.moveTo(1200, 1000);
    this.ctx.lineTo(1250, 1200);
    this.ctx.lineTo(1200, 1300);
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(canW / 2 + 50, canH / 2 + 300);
    this.ctx.lineTo(canW / 2 + 20, canH / 2 + 400);
    this.ctx.lineTo(canW / 2 + 80, canH / 2 + 600);

    this.ctx.strokeStyle = "rgb(245,244,212)";
    this.ctx.lineWidth = 15;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(200, 0);
    this.ctx.lineTo(400, 0);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(1400, 0);
    this.ctx.lineTo(1600, 0);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(600, canH);
    this.ctx.lineTo(800, canH);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(0, 800);
    this.ctx.lineTo(0, 1300);
    this.ctx.closePath();
    this.ctx.moveTo(canW / 2, canH / 2);
    this.ctx.lineTo(1100, canH);
    this.ctx.lineTo(1500, canH);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgba(245,244,212, 0.6)";
    this.ctx.fill();
  }
  async explosion() {
    const d = document.createElement("div");
    d.classList.add("explosion-seed");
    d.addEventListener("animationend", () => {
      this.$emit("breaked");
    });
    (this.$el.parentElement as HTMLElement).appendChild(d);
  }
}
</script>

<style scoped>
.dropin {
  animation: dropin 0.1s linear;
}
.buruburu {
  animation: buruburu 0.1s linear;
}
</style>
<style>
.explosion-seed {
  width: 2%;
  position: absolute;
  left: 49%;
  top: 49%;
  border-radius: 50%;
  height: auto;
  background: rgb(245, 244, 212);
  animation: explosion 0.3s;
}
.explosion-seed:before {
  content: "";
  display: block;
  padding-top: 100%;
}
@keyframes dropin {
  from {
    transform: translateY(-2%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes buruburu {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(1%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes explosion {
  0% {
    box-shadow: 0px 0px 0px 0px rgba(245, 244, 212, 1),
      0px 0px 0px 0px rgba(245, 244, 212, 1),
      0px 0px 0px 0px rgba(245, 244, 212, 1);
  }
  10% {
    box-shadow: 0px 0px 60px 60px rgba(245, 244, 212, 1),
      0px 0px 0px 0px rgba(245, 244, 212, 1),
      0px 0px 0px 0px rgba(245, 244, 212, 1);
  }
  20% {
    box-shadow: 0px 0px 120px 120px rgba(245, 244, 212, 1),
      0px 0px 60px 60px rgba(245, 244, 212, 1),
      0px 0px 0px 0px rgba(245, 244, 212, 1);
  }
  80% {
    box-shadow: 0px 0px 300px 300px rgba(245, 244, 212, 0.8),
      0px 0px 240px 240px rgba(245, 244, 212, 0.8),
      0px 0px 180px 180px rgba(245, 244, 212, 0.8);
  }
  90% {
    box-shadow: 0px 0px 300px 300px rgba(255, 255, 255, 0.8),
      0px 0px 300px 300px rgba(255, 255, 255, 0.8),
      0px 0px 240px 240px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0px 0px 300px 300px rgba(245, 244, 212, 0.8),
      0px 0px 300px 300px rgba(245, 244, 212, 0.8),
      0px 0px 300px 300px rgba(245, 244, 212, 0.8);
  }
}
</style>