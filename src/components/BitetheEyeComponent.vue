<template>
  <div class="parent100 centering noclick eye">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
    >
      <defs>
        <mask id="eyeMask">
          <rect width="100%" height="100%" fill="white" />
          <circle :cx="w / 2" :cy="h / 2" :r="h / 2" fill="black" />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        :width="w"
        :height="h"
        fill="white"
        mask="url(#eyeMask)"
      />
      <circle
        :cx="w / 2"
        :cy="h / 2"
        :r="h / 2 - h / 24"
        fill="none"
        :stroke-width="h / 12"
        stroke="rgba(0,0,0,0.8)"
      />
      <circle :cx="w / 2" :cy="h / 2" :r="h / 2 - h / 12" fill="rgba(74,52,28,0.8)" />
      <circle :cx="w / 2" :cy="h / 2" :r="h / 10" fill="rgba(0,0,0,0.8)" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BitetheEyeComponent extends Vue {
  readonly w = 792;
  readonly h = 792 * 1.5;
}
</script>
<style scoped>
.eye {
  position: absolute;
}
</style>