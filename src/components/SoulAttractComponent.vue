<template>
  <div class="parent100 centering noclick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
    >
      <rect x="0" y="0" :width="w" :height="h" fill="rgba(0,0,0,0.4)" />
      <circle
        v-for="(v, i) in xys"
        :key="`1_${i}`"
        :ref="`1_${i}`"
        :cx="v.x"
        :cy="v.y"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      />
      <circle
        v-for="(v, i) in xys"
        :key="`2_${i}`"
        :ref="`2_${i}`"
        :cx="v.x"
        :cy="v.y"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      />
      <text
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dominant-baseline="central"
        class="hikareau"
      >
        魂
        <tspan dominant-baseline="mathematical" style="font-size: 70">は</tspan>
        引かれ合う
      </text>

      <circle
        ref="1_last"
        :cx="w / 2"
        :cy="h / 2"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      />
      <circle
        ref="2_last"
        :cx="w / 2"
        :cy="h / 2"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SingleGasyaButtonComponent extends Vue {
  readonly w = 792;
  readonly h = 792 * 1.5;
  xys = [
    { x: (this.w * 2) / 3, y: this.h / 3 },
    { x: this.w / 5, y: this.h / 4 },
    { x: (this.w * 4) / 5, y: (this.h * 2) / 3 },
    { x: this.w / 4, y: (this.h * 4) / 5 },
  ];
  mounted() {
    const shortMS = 300;
    const longMS = 300;
    const smallHamonMS = 100;
    const refs = this.xys.map((_, i) => [
      this.$refs[`1_${i}`],
      this.$refs[`2_${i}`],
    ]);
    // 短い間隔の波紋
    refs.forEach((v, i) => {
      setTimeout(() => {
        (v[0] as HTMLElement[])[0].classList.add("hamon");
      }, shortMS * i);
      setTimeout(() => {
        (v[1] as HTMLElement[])[0].classList.add("hamon");
      }, shortMS * i + smallHamonMS);
    });
    // 最後の波紋は長い間隔
    const lastRefs = [this.$refs["1_last"], this.$refs["2_last"]];
    setTimeout(() => {
      (lastRefs[0] as HTMLElement).classList.add("hamon");
    }, shortMS * this.xys.length + longMS);
    setTimeout(() => {
      (lastRefs[1] as HTMLElement).classList.add("hamon");
    }, shortMS * this.xys.length + longMS + smallHamonMS);
  }
}
</script>

<style scoped>
.hikareau {
  font-family: Times New Roman;
  text-shadow: -6px 6px 10px white, 1px 1px 5px black;
  font-weight: bold;
  font-size: 100px;
  fill: rgb(135, 206, 235);
  stroke-width: 2;
  stroke: white;
}
.hamon {
  animation: hamon 1s ease;
}
@keyframes hamon {
  0% {
    r: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    r: 200;
    opacity: 0;
  }
}
</style>
