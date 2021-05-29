<template>
  <div class="parent100 centering">
    <div
      class="img-wrap img-anime"
      ref="img"
      :style="tdStyle"
      @animationend="endanime"
    />
    <AwaikenUnitTextComponent
      :unit="unit"
      :awaikingNum="awaikingNum"
      @done="done"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { UnitInfo } from "@/constants";
import AwaikenUnitTextComponent from "@/components/AwaikenUnitTextComponent.vue";

@Component({
  components: {
    AwaikenUnitTextComponent,
  },
})
export default class AwaikenUnitComponent extends Vue {
  @Prop() unit!: UnitInfo;
  @Prop() awaikingNum!: number;
  readonly w = 792;
  readonly h = 792 * 1.5;
  get tdStyle(): { background: string } {
    return {
      background: `url(${this.unit.pictureurl}) center center / contain no-repeat`,
    };
  }
  @Watch("unit")
  changeUnit() {
    (this.$refs.img as HTMLElement)?.classList?.add("img-anime");
  }
  endanime() {
    (this.$refs.img as HTMLElement)?.classList?.remove("img-anime");
  }
  done() {
    this.$emit("done");
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
.img-anime {
  animation: appear 0.1s ease;
}
@keyframes appear {
  0% {
    width: 80%;
  }
  100% {
    width: 100%;
  }
}
</style>
