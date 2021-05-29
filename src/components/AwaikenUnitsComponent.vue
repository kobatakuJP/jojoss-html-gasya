<template>
  <div class="parent100">
    <AwaikenUnitComponent :unit="currentUnit" @done="next" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UnitInfo } from "@/constants";
import AwaikenUnitComponent from "@/components/AwaikenUnitComponent.vue";

@Component({
  components: {
    AwaikenUnitComponent,
  },
})
export default class AwaikenUnitsComponent extends Vue {
  @Prop() result!: UnitInfo[];
  idx = 0;
  get currentUnit() {
    return this.result[this.idx];
  }
  next() {
    this.idx++;
    if (this.idx >= this.result.length) {
      this.$emit("done");
      this.$destroy();
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
