<template>
  <div class="parent100 noselect">
    <div style="font-weight: bold">ダイヤガシャ</div>
    <div ref="pc" class="pc" @click="pcClick">
      パソコン<br /><br /><br />
      {{ message }}
    </div>
    <div class="gasya-button ikkai" @click="pullGasha(1)">
      <SingleGasyaButtonComponent></SingleGasyaButtonComponent>
    </div>
    <div class="spacer"></div>
    <div class="gasya-button jukkai" @click="pullGasha(10)">
      <SetGasyaButtonComponent></SetGasyaButtonComponent>
    </div>
    <div class="version">version:{{ version }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingleGasyaButtonComponent from "@/components/SingleGasyaButtonComponent.vue";
import SetGasyaButtonComponent from "@/components/SetGasyaButtonComponent.vue";

@Component({
  components: { SingleGasyaButtonComponent, SetGasyaButtonComponent },
})
export default class SelectGasyaScene extends Vue {
  version = process.env.VUE_APP_GIT_COMMIT_HASH;
  pcCount = 0;
  message = "夢の全部入りガシャ！";
  pullGasha(v: number) {
    this.$emit("pull", v);
  }
  pcClick() {
    this.pcCount++;
    if (this.pcCount === 10) {
      this.message = "カタカタカタッターン";
      setTimeout(() => {
        this.message = "バタムッ！";
        (this.$refs.pc as Element).classList.add("bucha");
      }, 1000);
    }
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
  cursor: pointer;
}
.gasya-button.ikkai {
  border-color: rgb(150, 106, 74);
}
.gasya-button.jukkai {
  border-color: rgb(83, 41, 27);
}

.spacer {
  margin: 10%;
}
.pc {
  width: 90%;
  height: 30%;
  background-color: rgb(76, 75, 135);
  color: white;
  display: flex;
  margin: auto;
  border: ridge;
  justify-content: center; /*左右中央揃え*/
  cursor: pointer;
}
.pc.bucha {
  background: no-repeat center/100% url(../assets/bucha.jpg) rgba(0, 0, 0, 0);
}
.noselect {
  user-select: none;
}
</style>
