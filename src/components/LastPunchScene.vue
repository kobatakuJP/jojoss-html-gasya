<template>
  <OraaComponent />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue"
import OraaComponent from "@/components/OraaComponent.vue"

@Component({
  components: {
    OraaComponent
  }
})
export default class LastPunchScene extends AbstractScene {
  timeoutForDone = 1000;
}
</script>

<style scoped>
</style>
