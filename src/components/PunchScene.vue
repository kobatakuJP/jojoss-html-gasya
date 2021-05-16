<template>
  <div class="parent100">
    <oraora-component />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import OraoraComponent from "@/components/OraoraComponent.vue";

@Component({
  components: {
    OraoraComponent,
  },
})
export default class PunchScene extends AbstractScene {
  timeoutForDone = 2000;
}
</script>

<style scoped>
</style>
