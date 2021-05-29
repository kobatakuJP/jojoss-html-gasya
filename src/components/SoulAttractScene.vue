<template>
  <div @click="onclick" class="parent100">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <AwaikenUnitsComponent
      style="position: absolute"
      :result="filteredResults"
      :awaikingNums="awaikingNums"
      @done="done"
      v-if="!attracting"
    />
    <transition name="fade">
      <SoulAttractComponent
        style="position: absolute"
        v-show="attracting"
        @done="attracting = false"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";
import SoulAttractComponent from "@/components/SoulAttractComponent.vue";
import AwaikenUnitsComponent from "@/components/AwaikenUnitsComponent.vue";
import { RARITY, UnitInfo } from "@/constants";

@Component({
  components: {
    ResultSceneBackground,
    SoulAttractComponent,
    AwaikenUnitsComponent,
  },
})
export default class SoulAttractScene extends AbstractScene {
  /** 引かれ合ってる時 */
  attracting = true;
  @Prop() ssrUnits!: UnitInfo[];
  @Prop() ssrNums!: number[];
  /** filteredResultsの覚醒数一覧 */
  awaikingNums: number[] = [];
  /** SSRユニット一覧(重複排除済み) */
  get filteredResults() {
    return this.result
      .filter((v) => v.rarity === RARITY.SSR) // SSRでフィルタ
      .filter((v, i, self) => self.findIndex((w) => w.name === v.name) === i); // 名前で重複排除
  }
  beforeMount() {
    this.awaikingNums = this.filteredResults.map((v) => this.getAwaikingNum(v));
    if (
      this.filteredResults.length === 0 ||
      !this.awaikingNums.some((v) => v > 1)
    ) {
      // SSRユニットがないor覚醒数が2以上のものがない場合はスキップ
      this.done();
    }
  }
  getAwaikingNum(unit: UnitInfo): number {
    const i = this.ssrUnits.findIndex((v) => v.name === unit.name);
    return i >= 0 ? this.ssrNums[i] : 0;
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
