<template>
  <div>
    <WallBackground :rarity="currenRarity"></WallBackground>
    <div class="powa-soul s s1"></div>
    <div class="powa-soul s s2"></div>
    <div class="powa-soul s s3"></div>
    <div class="powa-soul s s4"></div>
    <div class="powa-soul s s5"></div>
    <div class="powa-soul s s6"></div>
    <div class="powa-soul m m1"></div>
    <div class="powa-soul m m2"></div>
    <div class="powa-soul m m3"></div>
    <div class="powa-soul m m4"></div>
    <div class="powa-soul l l1"></div>
    <div class="powa-soul l l2"></div>
    <div class="powa-soul l l3"></div>
    <div class="powa-soul l l4"></div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractScene from "@/components/AbstractScene.vue";
import WallBackground from "@/components/WallBackground.vue";

@Component({
  components: { WallBackground },
})
export default class PowaScene extends AbstractScene {
  // timeoutForDone = 3000;
}
</script>

<style scoped>
.powa-soul {
  position: absolute;
  border-radius: 50%;
  width: 5%;
  height: auto;
  background: white;
  box-shadow:  0px 0px 10px 10px gold;
}
.powa-soul:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.powa-soul.s {
  width: 2%;
}
.powa-soul.m {
  width: 5%;
}
.powa-soul.l {
  width: 10%;
}
.powa-soul.s.s1 {
  left: 80%;
  top: 40%;
}
.powa-soul.s.s2 {
  left: 45%;
  top: 42%;
}
.powa-soul.s.s3 {
  left: 60%;
  top: 50%;
}
.powa-soul.s.s4 {
  left: 45%;
  top: 55%;
}
.powa-soul.s.s5 {
  left: 10%;
  top: 60%;
}
.powa-soul.s.s6 {
  left: 40%;
  top: 70%;
}
.powa-soul.m.m1 {
  left: 90%;
  top: 25%;
}
.powa-soul.m.m2 {
  left: 12%;
  top: 50%;
}
.powa-soul.m.m3 {
  left: 95%;
  top: 70%;
}
.powa-soul.m.m4 {
  left: 50%;
  top: 80%;
}
.powa-soul.l.l1 {
  left: 40%;
  top: 10%;
}
.powa-soul.l.l2 {
  left: 98%;
  top: 40%;
}
.powa-soul.l.l3 {
  left: 15%;
  top: 75%;
}
.powa-soul.l.l4 {
  left: 65%;
  top: 85%;
}
</style>
