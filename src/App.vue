<template>
  <v-app id="v-app">
    <div id="app" :style="myStyle">
      <router-view />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  myStyle = { width: "100%", height: "100%" };
  handleResize(): void {
    // 縦横サイズを調整する
    const w = this.$el.parentElement?.clientWidth as number;
    const h = this.$el.parentElement?.clientHeight as number;
    if (w * 1.5 > h) {
      // 横長
      this.myStyle.height = `${h}px`;
      this.myStyle.width = `${h / 1.5}px`;
    } else {
      // 縦長
      this.myStyle.height = `${w * 1.5}px`;
      this.myStyle.width = `${w}px`;
    }
    this.setFillHeight();
  }
  /** スマホで100vhがうまくないのの対策 */
  setFillHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  mounted(): void {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  beforeDestroy(): void {
    window.removeEventListener("resize", this.handleResize);
  }
}
</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto !important; /* Vuetifyのスクロールバーうち消しのため */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: orange;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}
.parent100 {
  width: 100%;
  height: 100%;
}
.noclick {
  pointer-events: none;
}
.centering {
  display: flex;
  justify-content: center; /*左右中央揃え*/
  align-items: center; /*上下中央揃え*/
}
</style>
