<template>
  <div class="parent100 centering noclick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="792"
      height="132"
      viewBox="0 0 792 132"
    >
      <defs>
        <linearGradient id="set-grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f1e1d4" stop-opacity="1" />
          <stop offset="20%" stop-color="#f3673d" stop-opacity="1" />
          <stop offset="80%" stop-color="#170400" stop-opacity="1" />
          <stop offset="100%" stop-color="#f3673d" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="792" height="132" fill="url(#set-grad1)" />
      <defs>
        <linearGradient id="grad2" x1="0%" y1="30%" x2="00%" y2="90%">
          <stop id="g3" offset="0%" stop-color="#ded6d8" stop-opacity="1" />
          <stop id="g4" offset="50%" stop-color="#9b734a" stop-opacity="1" />
          <stop id="g5" offset="100%" stop-color="#ded6d8" stop-opacity="1" />
        </linearGradient>
      </defs>
      <text
        x="83"
        y="90"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 72;
          stroke: #86633e;
          fill: url(#grad2);
          filter: drop-shadow(1px 1px 1px #000);
        "
      >
        ガシャを引く!
      </text>
      <defs>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop id="g6" offset="0%" stop-color="#775744" stop-opacity="1" />
          <stop id="g7" offset="50%" stop-color="#9f7b65" stop-opacity="1" />
          <stop id="g8" offset="100%" stop-color="#775744" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect
        x="560"
        y="36"
        width="200"
        height="60"
        fill="rgba(0,0,0,0.1)"
        style="stroke: black"
      />
      <text
        x="580"
        y="78"
        style="
          font-family: Times New Roman;
          font-weight: lighter;
          font-size: 35;
          fill: white;
          filter: drop-shadow(1px 1px 1px #000);
        "
      >
        💎×0 消費
      </text>
      <defs>
        <linearGradient id="ten" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#a3b6c5" stop-opacity="1" />
          <stop offset="49%" stop-color="#fcf8f7" stop-opacity="1" />
          <stop offset="50%" stop-color="#170400" stop-opacity="1" />
          <stop offset="70%" stop-color="#a3b6c5" stop-opacity="1" />
        </linearGradient>
      </defs>
      <text
        x="70"
        y="15"
        style="
          font-weight: bolder;
          font-size: 90;
          font-style: oblique;
          stroke: #000000;
          fill: url(#ten);
          filter: drop-shadow(2px 2px 3px #000);
        "
      >
        10
      </text>
      <text
        x="170"
        y="15"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 50;
          stroke: #86633e;
          fill: #eace8f;
          filter: drop-shadow(1px 1px 1px #000);
        "
      >
        回!!
      </text>
      <polygon
        points="15,20 100,20 80,110 0,100"
        style="fill: rgb(76, 75, 135); stroke: black"
      />
      <text
        x="45"
        y="63"
        text-anchor="middle"
        dominant-baseline="central"
        style="
          font-family: Times New Roman;
          font-weight: bold;
          font-size: 50;
          font-style: oblique;
          fill: yellow;
          filter: drop-shadow(1px 1px 1px #000);
        "
      >
        {{ count }}
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SetGasyaButtonComponent extends Vue {
  @Prop() count!: number;
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