<template>
  <div @click="onclick">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <div v-if="result.length === 1" class="img-wrap">
      <img v-for="(unit, i) in result" :key="i" :src="unit.pictureurl" />
    </div>
    <div v-else-if="result.length === 10" class="img-wrap">
      <table>
        <tr>
          <td />
          <td rowspan="2" :style="tdStyle(1)" />
          <td />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(2)" />
          <td rowspan="2" :style="tdStyle(3)" />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(0)" />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(4)" />
          <td rowspan="2" :style="tdStyle(5)" />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(6)" />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(7)" />

          <td rowspan="2" :style="tdStyle(8)" />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(9)" />
        </tr>
        <tr>
          <td />
          <td />
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import ResultSceneBackground from "@/components/ResultSceneBackground.vue";

@Component({
  components: {
    ResultSceneBackground,
  },
})
export default class ResultScene extends AbstractScene {
  clickToDone = true;
  tdStyle(i: number) {
    return {
      background: `url(${this.result[i].pictureurl}) center center / contain no-repeat`,
    };
  }
}
</script>

<style scoped>
.img-wrap {
  position: absolute;
  width: 100%;
  height: 90%;
  top: 0;
  bottom: 0;
  margin: auto;
}
table {
  width: 100%;
  height: 100%;
}
tr {
  width: 32%;
  height: 12.5%;
  text-align: center;
  vertical-align: middle;
}
</style>
