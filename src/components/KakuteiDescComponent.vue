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
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dominant-baseline="central"
        lengthAdjust="spacingAndGlyphs"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 35;
          fill: black;
        "
      >
        確定機能は、∞セット目までとなります。
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SingleGasyaButtonComponent extends Vue {
  readonly w = 792;
  readonly h = 66;
}
</script>

<style scoped>
.centering {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}
.noclick {
  pointer-events: none;
}
</style>