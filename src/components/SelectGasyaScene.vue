<template>
  <div class="parent100">
    <div>ダイヤガシャ</div>

    <div class="gasya-button ikkai" @click="pullGasha(1)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="792"
        height="132"
        viewBox="0 0 792 132"
      >
        <defs>
          <linearGradient id="grad1" x1="50%" y1="50%" x2="100%" y2="100%">
            <stop id="g1" offset="0%" stop-color="#daa331" stop-opacity="1" />
            <stop id="g2" offset="100%" stop-color="#c25e34" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="792" height="132" fill="url(#grad1)" />
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
        <rect x="560" y="36" width="200" height="60" fill="url(#grad3)" />
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
      </svg>
    </div>
    <div class="gasya-button jukkai" @click="pullGasha(10)">
      10回!!ガシャを引く!<span class="gasya-button-dia">💎 ×0 消費</span>
    </div>
    <div class="version">version:{{ version }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SelectGasyaScene extends Vue {
  version = process.env.VUE_APP_GIT_COMMIT_HASH;
  pullGasha(v: number) {
    this.$emit("pull", v);
  }
}
</script>

<style scoped>
.version {
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 1rem;
  font-weight: bold;
}
.gasya-button {
  display: flex;
  width: 90%;
  height: 10%;
  vertical-align: middle;
  margin: auto;
  border: ridge;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}
.gasya-button.ikkai {
  background-color: rgb(242, 138, 39);
  border-color: rgb(150, 106, 74);
}
.gasya-button.jukkai {
  background-color: rgb(240, 19, 17);
}

.gasya-button-dia {
  border: inset;
  background-color: rgb(190, 142, 117);
}
</style>
