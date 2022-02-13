<template>
  <div class="parent100 centering noclick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
    >
      <text
        ref="txt"
        :style="`
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 100;
          fill: ${fillColor};
          stroke-width: 4;
          stroke: ${strokeColor};
        `"
      >
        <tspan :x="w/2" :y="h/2 + 200" font-size="200" rotate="10" > ！</tspan>
        <tspan :x="w/2+100" :y="h/2 + 100" font-size="100">ッ</tspan>
        <tspan :x="w/2+100" :y="h/2" font-size="180">ァ</tspan>
        <tspan :x="w/2" :y="h/2 - 100" font-size="200">ラ</tspan>
        <tspan :x="w/2 - 300" :y="h/2 - 200" font-size="350" rotate="-5">オ</tspan>
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class OraaComponent extends Vue {
  @Prop() isJolyn!: boolean;
  readonly w = 792;
  readonly h = 792 * 1.5;
  readonly idxs = [...Array(10).keys()];
  currentIdx = 0;
  loopID = -1;
  get fillColor(): string {
    return this.isJolyn ? "pink" : "black";
  }
  get strokeColor(): string {
    return "white";
  }
  mounted(): void {
    this.oraora();
  }
  destroyed(): void {
    clearInterval(this.loopID);
  }
  oraora(): void {
    this.loopID = setInterval(() => {
      this.ora(this.currentIdx);
      this.currentIdx >= this.idxs.length - 1
        ? (this.currentIdx = 0)
        : this.currentIdx++;
    }, 100);
  }
  ora(i: number): void {
    const t = (this.$refs[`txt`] as SVGTextElement[])[i];
    if (!t) return;
    t.setAttribute("x", this.getRand(this.w + 20) - 20 + "");
    t.setAttribute("y", this.getRand(this.h + 50) - 50 + "");
    t.setAttribute("display", "block");
    t.classList.add("ora-anime");
  }
  endOra(t: SVGTextElement): void {
    t.classList.remove("ora-anime");
    t.setAttribute("display", "none");
  }
  getRand(n: number): number {
    return Math.random() * n;
  }
}
</script>

<style scoped>
.ora-anime {
  animation: oraora 0.2s linear;
}
@keyframes oraora {
  0% {
    opacity: 1;
  }
  20% {
    transform: translateX(1%);
  }
  40% {
    transform: translateX(0%);
  }
  60% {
    transform: translateX(1%);
  }
  80% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
