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
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 100;
          fill: black;
          stroke-width: 4;
          stroke: white;
        "
      >
        <tspan x="100" y="200" font-size="250" rotate="-45">ド</tspan>
        <tspan x="200" y="100" font-size="100">ギ</tspan>
        <tspan x="300" y="100" font-size="80">ュ</tspan>
        <tspan x="350" y="0" font-size="70">ウ</tspan>
        <tspan x="450" y="50" font-size="70" rotate="10">ウ</tspan>
        <tspan x="500" y="100" font-size="100" rotate="30">ー</tspan>
        <tspan x="600" y="200" font-size="200">ン</tspan>
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DogyuunComponent extends Vue {
  readonly w = 792;
  readonly h = 792;
}
</script>