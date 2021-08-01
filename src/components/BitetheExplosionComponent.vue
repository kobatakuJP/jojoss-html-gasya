<template>
  <div class="parent100 centering noclick eye">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
    >
      <circle :cx="w / 2" :cy="h / 2" r="20" fill="yellow" />
      <circle :cx="w / 2 + 10" :cy="h / 2" r="20" fill="white" />
      <circle :cx="w / 2 - 20" :cy="h / 2 - 20" r="20" fill="yellow" />
      <circle :cx="w / 2 + 50" :cy="h / 2" r="50" fill="red" />
      <circle :cx="w / 2" :cy="h / 2" r="20" fill="yellow" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class KakuteiMsgComponent extends Vue {
  readonly w = 792;
  readonly h = 792 * 1.5;
}
</script>
<style scoped>
.eye {
  position: absolute;
}
</style>