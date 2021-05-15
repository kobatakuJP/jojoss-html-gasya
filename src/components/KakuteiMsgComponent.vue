<template>
  <div class="parent100 centering noclick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="w"
      :height="h"
      :viewBox="`0 0 ${w} ${h}`"
    >
      <defs>
        <linearGradient id="kakutei-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgb(112,81,53)" stop-opacity="1" />
          <stop offset="20%" stop-color="rgb(1,1,3)" stop-opacity="1" />
          <stop offset="50%" stop-color="rgb(1,1,3)" stop-opacity="1" />
          <stop offset="100%" stop-color="rgb(112,81,53)" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect
        ref="rect"
        x="0"
        y="0"
        :width="w"
        :height="h"
        fill="url(#kakutei-grad)"
      />
      <text
        v-show="isTxt1"
        ref="txt1"
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dominant-baseline="central"
        lengthAdjust="spacingAndGlyphs"
        style="
          font-family: Times New Roman;
          font-size: 50;
          stroke: #86633e;
          fill: white;
          filter: drop-shadow(1px 1px 1px #000);
        "
      >
        {{ msg }}1
      </text>
      <text
        v-show="!isTxt1"
        ref="txt2"
        :x="w / 2"
        :y="h / 2"
        text-anchor="middle"
        dominant-baseline="central"
        lengthAdjust="spacingAndGlyphs"
        style="
          font-family: Times New Roman;
          font-size: 50;
          stroke: #86633e;
          fill: white;
          filter: drop-shadow(1px 1px 1px #000);
        "
      >
        {{ msg }}2
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class SingleGasyaButtonComponent extends Vue {
  @Prop() msg!: number;
  readonly w = 792;
  readonly h = 66;
  isTxt1 = false;
  mounted() {
    this.resizeFont();
  }
  @Watch("msg")
  changeMsg() {
    this.$nextTick(this.resizeFont);
  }
  resizeFont() {
    const txt1 = this.$refs.txt1 as SVGTextElement;
    const txt2 = this.$refs.txt2 as SVGTextElement;
    const [currentText, nextText] = this.isTxt1 ? [txt1, txt2] : [txt2, txt1];
    // nextを調整して、currentをリセットして、トグルする
    if (this.w - 10 < currentText.getBBox().width) {
      // nextText.textLength.baseVal.newValueSpecifiedUnits(
      //   SVGLength.SVG_LENGTHTYPE_PX,
      //   this.w - 10
      // );
      nextText.setAttribute("textLength", `${this.w - 10}`)
    }
    currentText.removeAttribute("textLength");
    this.isTxt1 = !this.isTxt1;
  }
}
</script>

<style scoped>
.centering {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}
.noclick {
  pointer-events: none;
}
</style>