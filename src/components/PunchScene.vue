<template>
  <div class="parent100">
    <WallBackground></WallBackground>
    <star-background class="tateyure" :is-flash="true"/>
    <oraora-component style="position: absolute" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import WallBackground from "@/components/WallBackground.vue";
import StarBackground from "@/components/StarBackground.vue";
import AbstractScene from "@/components/AbstractScene.vue";
import OraoraComponent from "@/components/OraoraComponent.vue";

@Component({
  components: {
    WallBackground,
    StarBackground,
    OraoraComponent,
  },
})
export default class PunchScene extends AbstractScene {
  timeoutForDone = 2000;
}
</script>

<style scoped>
.tateyure {
  animation: tateyure 0.15s linear infinite;
}
@keyframes tateyure {
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(1%);
  }
}
@keyframes identifier {
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(1%);
  }
}
</style>
