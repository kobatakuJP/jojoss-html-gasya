<template>
  <div class="parent100">
    <div class="parent100 centering">
      <div class="img-wrap" :style="tdStyle" @click="next" />
      <AwaikenUnitTextComponent :currentUnit="result[idx]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UnitInfo } from "@/constants";
import AwaikenUnitTextComponent from "@/components/AwaikenUnitTextComponent.vue";

@Component({
  components: {
    AwaikenUnitTextComponent,
  },
})
export default class ResultScene extends Vue {
  @Prop() result!: UnitInfo[];
  idx = 0;
  readonly w = 792;
  readonly h = 792 * 1.5;
  get tdStyle(): { background: string } {
    return {
      background: `url(${
        this.result[this.idx].pictureurl
      }) center center / contain no-repeat`,
    };
  }
  next() {
    this.idx++;
    if (this.idx >= this.result.length) {
      this.$emit("done");
    }
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
