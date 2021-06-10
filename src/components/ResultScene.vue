<template>
  <div @click="onclick">
    <ResultSceneBackground :rarity="currenRarity"></ResultSceneBackground>
    <div v-if="result.length === 1" class="img-wrap" :style="tdStyle(0)">
      <PlusOneComponent wp="100" hp="100" v-show="result[0].p1" />
      <NewComponent wp="100" hp="100" v-show="result[0].new" />
    </div>
    <div v-else-if="result.length === 10" class="img-wrap">
      <table>
        <tr>
          <td />
          <td rowspan="2" :style="tdStyle(1)">
            <PlusOneComponent wp="32" hp="25" v-show="result[1].p1" />
            <NewComponent wp="32" hp="25" v-show="result[1].new" />
          </td>
          <td />
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(2)">
            <PlusOneComponent wp="32" hp="25" v-show="result[2].p1" />
            <NewComponent wp="32" hp="25" v-show="result[2].new" />
          </td>
          <td rowspan="2" :style="tdStyle(3)">
            <PlusOneComponent wp="32" hp="25" v-show="result[3].p1" />
            <NewComponent wp="32" hp="25" v-show="result[3].new" />
          </td>
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(0)">
            <PlusOneComponent wp="32" hp="25" v-show="result[0].p1" />
            <NewComponent wp="32" hp="25" v-show="result[0].new" />
          </td>
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(4)">
            <PlusOneComponent wp="32" hp="25" v-show="result[4].p1" />
            <NewComponent wp="32" hp="25" v-show="result[4].new" />
          </td>
          <td rowspan="2" :style="tdStyle(5)">
            <PlusOneComponent wp="32" hp="25" v-show="result[5].p1" />
            <NewComponent wp="32" hp="25" v-show="result[5].new" />
          </td>
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(6)">
            <PlusOneComponent wp="32" hp="25" v-show="result[6].p1" />
            <NewComponent wp="32" hp="25" v-show="result[6].new" />
          </td>
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(7)">
            <PlusOneComponent wp="32" hp="25" v-show="result[7].p1" />
            <NewComponent wp="32" hp="25" v-show="result[7].new" />
          </td>
          <td rowspan="2" :style="tdStyle(8)">
            <PlusOneComponent wp="32" hp="25" v-show="result[8].p1" />
            <NewComponent wp="32" hp="25" v-show="result[8].new" />
          </td>
        </tr>
        <tr>
          <td rowspan="2" :style="tdStyle(9)">
            <PlusOneComponent wp="32" hp="25" v-show="result[9].p1" />
            <NewComponent wp="32" hp="25" v-show="result[9].new" />
          </td>
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
import PlusOneComponent from "@/components/PlusOneComponent.vue";
import NewComponent from "@/components/NewComponent.vue";

@Component({
  components: {
    ResultSceneBackground,
    PlusOneComponent,
    NewComponent,
  },
})
export default class ResultScene extends AbstractScene {
  clickToDone = true;
  tdStyle(i: number): { background: string } {
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
td {
  width: 32%;
  height: 12.5%;
  vertical-align: top;
}
</style>
