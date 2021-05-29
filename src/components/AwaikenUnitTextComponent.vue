<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="w"
    :height="h"
    :viewBox="`0 0 ${w} ${h}`"
    class="parent100"
    style="position: absolute"
    @click="click"
  >
    <defs>
      <filter id="awaiken-font-shadow">
        <feDropShadow dx="10" dy="20" stdDeviation="5" />
      </filter>
    </defs>
    <transition name="list">
      <text
        v-show="animeIdx > 0"
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dy="-0.25em"
        class="noclick"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 120;
          font-style: oblique;
          filter: url(#awaiken-font-shadow);
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
        class="noclick"
      />
    </transition>

    <defs>
      <filter id="awaiken-num-font-shadow">
        <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="yellow" />
      </filter>
    </defs>
    <transition name="list">
      <text
        v-show="animeIdx > 1"
        :x="w / 2"
        :y="h / 2 + numH / 2"
        text-anchor="middle"
        dominant-baseline="central"
        class="noclick"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 100;
          font-style: oblique;
          filter: url(#awaiken-num-font-shadow);
          fill: red;
          stroke-width: 1;
          stroke: gold;
        "
      >
        +{{ awaikingNum - 1 }}
      </text>
    </transition>
    <transition name="list">
      <polygon
        v-show="animeIdx > 1"
        :points="`80,${h / 2 + numH} ${w - 80},${h / 2 + numH} ${w - 60},${
          h / 2 + numH + mesH / 2
        } ${w - 80},${h / 2 + numH + mesH} 80,${h / 2 + numH + mesH} 60,${
          h / 2 + numH + mesH / 2
        }`"
        fill="black"
        stroke-width="1"
        stroke="gold"
        class="noclick"
      />
    </transition>
    <transition name="list">
      <text
        v-show="animeIdx > 2"
        :x="w / 2"
        :y="h / 2 + numH + mesH / 2"
        text-anchor="middle"
        dominant-baseline="central"
        class="noclick"
        style="font-family: Times New Roman; font-size: 30; fill: white"
      >
        {{ unit.name }}が覚醒したッ！
      </text>
    </transition>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { UnitInfo } from "@/constants";

@Component
export default class AwaikenUnitTextComponent extends Vue {
  @Prop() unit!: UnitInfo;
  @Prop() awaikingNum!: number;
  animeIdx = 0;
  timeoutID = -1;
  readonly w = 792;
  readonly h = 792 * 1.5;
  readonly numH = 100;
  readonly mesH = 50;
  readonly lastAnimeIdx = 3;
  mounted() {
    this.timeoutID = setTimeout(this.next, 200);
  }
  @Watch("unit")
  changeUnit() {
    this.animeIdx = 0;
    this.timeoutID = setTimeout(this.next, 200);
  }
  next() {
    clearTimeout(this.timeoutID);
    this.animeIdx++;
    if (this.animeIdx <= this.lastAnimeIdx) {
      this.timeoutID = setTimeout(this.next, 200);
    }
  }
  click() {
    if (this.animeIdx <= this.lastAnimeIdx) {
      this.next();
    } else {
      this.$emit("done");
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
  transition: all 0.1s;
}
.list-enter {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
}
</style>
