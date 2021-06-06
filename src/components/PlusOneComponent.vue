<template>
  <div class="noclick" :style="styleObj">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
      class="parent100"
    >
      <text
        :x="w / 2"
        :y="h * 0.75"
        text-anchor="middle"
        dominant-baseline="central"
        :style="`
          font-family: Times New Roman;
          font-weight: bold;
          font-size: ${w / 4};
          font-style: oblique;
            fill: yellow; 
            stroke-width: 2; 
            stroke: black
        `"
      >
        ★
      </text>
      <text
        :x="w / 2"
        :y="h * 0.75"
        text-anchor="middle"
        dominant-baseline="central"
        :style="`
          font-family: Times New Roman;
          font-weight: bold;
          font-size: ${w / 5};
          font-style: oblique;
          fill: red;
          stroke-width: 1;
          stroke: gold;
        `"
      >
        +1
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PlusOneComponent extends Vue {
  @Prop() wp!: number;
  @Prop() hp!: number;
  readonly w = this.wp * 10;
  readonly h = this.hp * 10 * 1.5;
  get styleObj() {
    return {
      position: "absolute",
      width: `${this.wp}%`,
      height: `${this.hp}%`,
    };
  }
}
</script>

<style scoped>
</style>
