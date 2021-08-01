<template>
  <div @click="onclick" class="parent100 centering">
    <!-- 真っ暗 自前<br>
    フェードイン（ユニット画面）BitetheUnitComponent<br>
    目オーバーレイ（ほんとはKQも一緒）BitetheEyeComponent<br>
    カチッ 自前<br>
    （すぐ）ドグオオン、白画面 BitetheExplosionComponent<br>
    シュゴォーーッ BitetheShugooComponent<br>
    +1 PlusOneComponent<br> -->
    <bitethe-unit-component :unit="bitethedustUnit" />
    <bitethe-eye-component />
    <bitethe-kachi-component />
    <bitethe-doguoon-component />
    <bitethe-explosion-component />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import BitetheUnitComponent from "@/components/BitetheUnitComponent.vue";
import BitetheEyeComponent from "@/components/BitetheEyeComponent.vue";
import BitetheKachiComponent from "@/components/BitetheKachiComponent.vue";
import BitetheDoguoonComponent from "@/components/BitetheDoguoonComponent.vue";
import BitetheExplosionComponent from "@/components/BitetheExplosionComponent.vue";
import { GasyaResultUnit } from "@/constants";

@Component({
  components: {
    BitetheUnitComponent,
    BitetheEyeComponent,
    BitetheKachiComponent,
    BitetheDoguoonComponent,
    BitetheExplosionComponent,
  },
})
export default class BitethedustScene extends AbstractScene {
  get bitethedustUnit(): GasyaResultUnit | undefined {
    return this.result.find((v) => v.b);
  }
  beforeMount() {
    if (!this.bitethedustUnit)
      // バイツァ対象がない場合はスキップ
      this.done();
  }
}
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
