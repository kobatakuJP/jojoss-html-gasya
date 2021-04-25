<template>
  <div class="parent100">
    <div>ダイヤガシャ</div>

    <div class="gasya-button ikkai" @click="pullGasha(1)">
      <GasyaButtonComponent></GasyaButtonComponent>
    </div>
    <div class="spacer"></div>
    <div class="gasya-button jukkai" @click="pullGasha(10)">
      <GasyaButtonComponent></GasyaButtonComponent>
    </div>
    <div class="version">version:{{ version }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GasyaButtonComponent from "@/components/GasyaButtonComponent.vue";

@Component({
  components: { GasyaButtonComponent },
})
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
.spacer {
  margin: 10%;
}
</style>
