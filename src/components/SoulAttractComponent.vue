<template>
  <div class="parent100 centering noclick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
    >
      <rect x="0" y="0" :width="w" :height="h" fill="rgba(0,0,0,0.4)" />
      <circle
        v-for="(v, i) in xys"
        :key="`1_${i}`"
        :cx="v.x"
        :cy="v.y"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      >
        <animate
          :ref="`1_${i}`"
          attributeName="r"
          values="0;200"
          dur="1s"
          begin="indefinite"
          keyTimes="0;1"
          keySplines="0.25 0.1 0.25 1.0"
        />
        <animate
          :ref="`1_after_${i}`"
          attributeName="stroke-opacity"
          values="1;1;0"
          dur="1s"
          begin="indefinite"
          keyTimes="0;.8;1"
        />
      </circle>
      <circle
        v-for="(v, i) in xys"
        :key="`2_${i}`"
        :ref="`2_${i}`"
        :cx="v.x"
        :cy="v.y"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      >
        <animate
          :ref="`2_${i}`"
          attributeName="r"
          values="0;200"
          dur="1s"
          begin="indefinite"
          keyTimes="0;1"
          keySplines="0.25 0.1 0.25 1.0"
        />
        <animate
          :ref="`2_after_${i}`"
          attributeName="stroke-opacity"
          values="1;1;0"
          dur="1s"
          begin="indefinite"
          keyTimes="0;.8;1"
        />
      </circle>
      <defs>
        <filter id="soulattract-font-shadow">
          <feDropShadow dx="-6" dy="16" stdDeviation="10" flood-color="white" />
        </filter>
      </defs>
      <text
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dominant-baseline="central"
        class="hikareau"
      >
        魂
        <tspan dominant-baseline="mathematical" style="font-size: 70">は</tspan>
        引かれ合う
      </text>

      <circle
        :cx="w / 2"
        :cy="h / 2"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      >
        <animate
          ref="1_last"
          attributeName="r"
          values="0;200"
          dur="1s"
          begin="indefinite"
          keyTimes="0;1"
          keySplines="0.25 0.1 0.25 1.0"
        />
        <animate
          :ref="`1_after_last`"
          attributeName="stroke-opacity"
          values="1;1;0"
          dur="1s"
          begin="indefinite"
          keyTimes="0;.8;1"
        />
      </circle>
      <circle
        :cx="w / 2"
        :cy="h / 2"
        stroke="white"
        fill-opacity="0"
        stroke-width="2"
      >
        <animate
          ref="2_last"
          attributeName="r"
          values="0;200"
          dur="1s"
          begin="indefinite"
          keyTimes="0;1"
          keySplines="0.25 0.1 0.25 1.0"
        />
        <animate
          :ref="`2_after_last`"
          attributeName="stroke-opacity"
          values="1;1;0"
          dur="1s"
          begin="indefinite"
          keyTimes="0;.8;1"
        />
      </circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
/** TSでbeginElementが用意されていないので追加 */
interface SVGElement extends Element {
  beginElement(): SVGElement;
}
@Component
export default class SoulAttractComponent extends Vue {
  readonly w = 792;
  readonly h = 792 * 1.5;
  xys = [
    { x: (this.w * 2) / 3, y: this.h / 3 },
    { x: this.w / 5, y: this.h / 4 },
    { x: (this.w * 4) / 5, y: (this.h * 2) / 3 },
    { x: this.w / 4, y: (this.h * 4) / 5 },
  ];
  mounted() {
    const shortMS = 300;
    const longMS = 300;
    const smallHamonMS = 100;
    const refs = this.xys.map((_, i) => [
      this.$refs[`1_${i}`],
      this.$refs[`1_after_${i}`],
      this.$refs[`2_${i}`],
      this.$refs[`2_after_${i}`],
    ]);
    // 短い間隔の波紋
    refs.forEach((v, i) => {
      setTimeout(() => {
        (v[0] as SVGElement[])[0]?.beginElement();
        (v[1] as SVGElement[])[0]?.beginElement();
      }, shortMS * i);
      setTimeout(() => {
        (v[2] as SVGElement[])[0]?.beginElement();
        (v[3] as SVGElement[])[0]?.beginElement();
      }, shortMS * i + smallHamonMS);
    });
    // 最後の波紋は長い間隔
    const lastRefs = [
      this.$refs["1_last"],
      this.$refs["1_after_last"],
      this.$refs["2_last"],
      this.$refs["2_after_last"],
    ];
    setTimeout(() => {
      (lastRefs[0] as SVGElement)?.beginElement();
      (lastRefs[1] as SVGElement)?.beginElement();
    }, shortMS * this.xys.length + longMS);
    setTimeout(() => {
      (lastRefs[2] as SVGElement)?.beginElement();
      (lastRefs[3] as SVGElement)?.beginElement();
      // フェードアウトさせつつ
      this.$emit("done");
    }, shortMS * this.xys.length + longMS + smallHamonMS);
  }
}
</script>

<style scoped>
.hikareau {
  font-family: Times New Roman;
  filter: url(#soulattract-font-shadow);
  font-weight: bold;
  font-size: 100px;
  fill: rgb(139, 186, 206);
  stroke-width: 2;
  stroke: white;
}
</style>
