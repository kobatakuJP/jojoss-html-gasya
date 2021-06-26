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
    <text
      text-anchor="middle"
      class="noclick"
      writing-mode="tb"
      rotate="10"
      style="
        font-family: Times New Roman;
        font-weight: bold;
        font-size: 200;
        fill: black;
        stroke-width: 2;
        stroke: white;
      "
    >
      <tspan x="100" y="200">ド</tspan>
      <tspan x="400" y="250">グ</tspan>
      <tspan x="700" y="150" style="font-size: 100">オ</tspan>
      <tspan x="650" y="450">オ</tspan>
      <tspan x="550" y="900" style="font-size: 350">ン</tspan>
    </text>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AwaikenUnitTextComponent extends Vue {
  readonly w = 792;
  readonly h = 792 * 1.5;
}
</script>