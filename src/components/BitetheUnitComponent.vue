<template>
  <div class="parent100 centering">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <div class="img-wrap" :style="tdStyle" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GasyaResultUnit, RARITY } from "@/constants";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";

@Component({ components: { ResultSceneBackground } })
export default class BitetheUnitComponent extends Vue {
  @Prop() unit!: GasyaResultUnit;
  readonly w = 792;
  readonly h = 792 * 1.5;
  get currenRarity(): RARITY {
    return this.unit?.rarity;
  }
  get tdStyle(): { background: string } {
    return {
      background: `url(${this.unit?.pictureurl}) center center / contain no-repeat`,
    };
  }
}
</script>

<style scoped>
.img-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
