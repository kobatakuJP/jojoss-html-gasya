<template>
  <div class="parent100 centering">
    <dogyuun-component class="dogyuun" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import DogyuunComponent from "@/components/DogyuunComponent.vue";

@Component({
  components: {
    DogyuunComponent,
  },
})
export default class PuncherAppearScene extends AbstractScene {
  timeoutForDone = 1000;
}
</script>

<style scoped>
.dogyuun {
  animation: dogyuun 1s linear;
}
.centering {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}
@keyframes dogyuun {
  0% {
    width: 0%;
  }
  45% {
    width: 0%;
  }
  50% {
    width: 100%;
  }
  55% {
    transform: translateX(1%);
  }
  60% {
    transform: translateX(0%);
  }
  65% {
    transform: translateX(1%);
  }
  70% {
    transform: translateX(0%);
  }
  75% {
    transform: translateX(1%);
  }
  80% {
    transform: translateX(0%);
  }
  85% {
    transform: translateX(1%);
  }
  90% {
    transform: translateX(0%);
  }
}
</style>
