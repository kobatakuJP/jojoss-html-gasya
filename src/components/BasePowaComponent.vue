<template>
  <div class="powa-wrapper parent100">
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
    <div class="powa-soul rapid r1"></div>
    <div class="powa-soul rapid r2"></div>
    <div class="powa-soul rapid r3"></div>
    <div class="powa-soul rapid r4"></div>
    <div class="powa-soul rapid r5"></div>
    <div class="powa-soul rapid r6"></div>
    <div class="powa-soul rapid r7"></div>
    <div class="powa-soul rapid r8"></div>
    <div class="powa-soul rapid r9"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PowaScene extends Vue {}
</script>

<style scoped>
.powa-wrapper {
  perspective: 400px;
}
.powa-soul {
  position: absolute;
  border-radius: 50%;
  height: auto;
  background: white;
  animation: move-powa 5s linear, powapowa 0.2s infinite;
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
.powa-soul.rapid {
  width: 8%;
  animation: powapowa 0.2s infinite;
}
/* 
計算式（本当は動的に計算したいが、cssなのでできない）
left: 50-ポワ半径-(半径*COS(RADIANS(40*n(12時が0)+90)))*1.5(アスペクト比)
top: 50-ポワ半径-(半径*SIN(RADIANS(40*n(12時が0)+90)))
*/
.powa-soul.rapid.r1 {
  left: 46%;
  top: 25%;
}
.powa-soul.rapid.r2 {
  left: 66.2478097051%;
  top: 29.9130666945%;
}
.powa-soul.rapid.r3 {
  left: 77.0214442199%;
  top: 42.353388269%;
}
.powa-soul.rapid.r4 {
  left: 73.2798002192%;
  top: 56.5%;
}
.powa-soul.rapid.r5 {
  left: 56.7736345148%;
  top: 65.7335450365%;
}
.powa-soul.rapid.r6 {
  left: 35.2263654852%;
  top: 65.7335450365%;
}
.powa-soul.rapid.r7 {
  left: 18.7201997808%;
  top: 56.5%;
}
.powa-soul.rapid.r8 {
  left: 14.9785557801%;
  top: 42.353388269%;
}
.powa-soul.rapid.r9 {
  left: 25.7521902949%;
  top: 29.9130666945%;
}

@keyframes move-powa {
  0% {
    transform: translateZ(150px);
  }
  100% {
    transform: translateZ(0px);
  }
}
@keyframes powapowa {
  0% {
    box-shadow: 0px 0px 2px 2px white, 0px 0px 10px 10px white;
  }
  50% {
    box-shadow: 0px 0px 2px 4px white, 0px 0px 10px 10px white;
  }
  100% {
    box-shadow: 0px 0px 2px 2px white, 0px 0px 10px 10px white;
  }
}
</style>
