<template>
  <div class="noclick" :style="styleObj">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
      class="parent100"
    >
      <defs>
        <filter :id="`new-shadow-${_uid}`">
          <feDropShadow dx="10" dy="10" />
        </filter>
      </defs>
      <path
        fill="none"
        stroke="orange"
        :stroke-width="w / 10"
        id="newPath"
        :d="`M${w / 20},${h / 5} l${w / 3},${-h / 10}`"
      />
      <text
        :style="`
          font-family: Times New Roman;
          font-weight: bolder ;
          font-size: ${w / 7};
          font-style: oblique;
          fill: red;
          filter:url(#new-shadow-${_uid});
          stroke-width: 1;
          stroke: white;
        `"
      >
        <textPath href="#newPath">NEW!</textPath>
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NewComponent extends Vue {
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
