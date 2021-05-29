<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="w"
    :height="h"
    :viewBox="`0 0 ${w} ${h}`"
    class="parent100 noclick"
    style="position: absolute"
  >
    <transition name="list">
      <text
        v-show="animeIdx > 0"
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dominant-baseline="text-after-edge"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 120;
          font-style: oblique;
          filter: drop-shadow(10px 20px 5px black);
          fill: red;
          stroke-width: 1;
          stroke: white;
        "
      >
        <tspan style="fill: yellow; stroke-width: 2; stroke: black">★</tspan>
        魂の覚醒!
      </text>
    </transition>
    <transition name="list">
      <polygon
        v-show="animeIdx > 1"
        :points="`100,${h / 2} ${w - 100},${h / 2} ${w - 80},${
          h / 2 + numH / 2
        } ${w - 100},${h / 2 + numH} 100,${h / 2 + numH} 80,${
          h / 2 + numH / 2
        }`"
        fill="rgba(0,0,0,0.8)"
        stroke-width="3"
        stroke="gold"
      />
    </transition>
    <transition name="list">
      <text
        v-show="animeIdx > 1"
        :x="w / 2"
        :y="h / 2 + numH / 2"
        text-anchor="middle"
        dominant-baseline="central"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 100;
          font-style: oblique;
          filter: drop-shadow(0px 0px 10px yellow);
          fill: red;
          stroke-width: 1;
          stroke: gold;
        "
      >
        +72
      </text>
    </transition>
    <transition name="list">
      <polygon
        v-show="animeIdx > 2"
        :points="`80,${h / 2 + numH} ${w - 80},${h / 2 + numH} ${w - 60},${
          h / 2 + numH + mesH / 2
        } ${w - 80},${h / 2 + numH + mesH} 80,${h / 2 + numH + mesH} 60,${
          h / 2 + numH + mesH / 2
        }`"
        fill="black"
        stroke-width="1"
        stroke="gold"
      />
    </transition>
    <transition name="list">
      <text
        v-show="animeIdx > 3"
        :x="w / 2"
        :y="h / 2 + numH + mesH / 2"
        text-anchor="middle"
        dominant-baseline="central"
        style="font-family: Times New Roman; font-size: 30; fill: white"
      >
        {{currentUnit.name}}が覚醒したッ！
      </text>
    </transition>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UnitInfo } from "@/constants";

@Component
export default class ResultScene extends Vue {
  @Prop() currentUnit!: UnitInfo;
  animeIdx = 0;
  timeoutID = -1;
  readonly w = 792;
  readonly h = 792 * 1.5;
  readonly numH = 100;
  readonly mesH = 50;
  readonly allAnime = 4;
  mounted() {
    this.timeoutID = setTimeout(this.next, 200);
  }
  next() {
    clearTimeout(this.timeoutID);
    this.animeIdx++;
    if (this.animeIdx < this.allAnime) {
      this.timeoutID = setTimeout(this.next, 200);
    }
  }
}
</script>

<style scoped>
.img-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: appear 0.1s ease;
}
@keyframes appear {
  0% {
    width: 80%;
  }
  100% {
    width: 100%;
  }
}
.list-enter-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
}
</style>
