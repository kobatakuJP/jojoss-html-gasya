<template>
  <div>
    <div class="version">version:{{ version }}</div>
    <div><button @click="pullGasha(1)">ガシャを引く!💎0個消費</button></div>
    <div>
      <button @click="pullGasha(10)">10回!!ガシャを引く!💎0個消費</button>
    </div>
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
  font-size: 0.8em;
  font-weight: bold;
}
</style>
