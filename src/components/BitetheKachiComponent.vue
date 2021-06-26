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
      :x="w / 4"
      :y="h / 1.7"
      text-anchor="middle"
      class="noclick"
      writing-mode="tb"
      rotate="-5"
      style="
        font-family: Times New Roman;
        font-weight: bold;
        font-size: 60;
        font-style: oblique;
        fill: white;
        stroke-width: 5;
        stroke: black;
      "
    >
      カチッ
    </text>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BitetheKachiComponent extends Vue {
  readonly w = 792;
  readonly h = 792 * 1.5;
}
</script>