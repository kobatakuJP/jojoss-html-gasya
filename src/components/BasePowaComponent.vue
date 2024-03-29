<template>
  <div class="powa-wrapper parent100" :style="styles">
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
    <div ref="r1" @animationend="rapidAnimEnd" class="powa-soul rapid r1"></div>
    <div ref="r2" @animationend="rapidAnimEnd" class="powa-soul rapid r2"></div>
    <div ref="r3" @animationend="rapidAnimEnd" class="powa-soul rapid r3"></div>
    <div ref="r4" @animationend="rapidAnimEnd" class="powa-soul rapid r4"></div>
    <div ref="r5" @animationend="rapidAnimEnd" class="powa-soul rapid r5"></div>
    <div ref="r6" @animationend="rapidAnimEnd" class="powa-soul rapid r6"></div>
    <div ref="r7" @animationend="rapidAnimEnd" class="powa-soul rapid r7"></div>
    <div ref="r8" @animationend="rapidAnimEnd" class="powa-soul rapid r8"></div>
    <div ref="r9" @animationend="rapidAnimEnd" class="powa-soul rapid r9"></div>
  </div>
</template>

<script lang="ts">
import { RARITY } from "@/constants";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class BasePowaComponent extends Vue {
  rCount = 0;
  powaColor = "white";
  get styles() {
    return {
      "--powa-color": this.powaColor,
    };
  }
  @Prop() targetRarity!: RARITY;
  mounted(): void {
    const refs = [
      this.$refs.r1,
      this.$refs.r4,
      this.$refs.r7,
      this.$refs.r2,
      this.$refs.r5,
      this.$refs.r9,
      this.$refs.r3,
      this.$refs.r6,
      this.$refs.r8,
    ];
    // 真ん中で集合するポワ
    setTimeout(() => {
      refs.forEach((v, i) =>
        setTimeout(() => {
          (v as HTMLElement).classList.add("zoom");
        }, 65 * i)
      );
    }, 500);
    // ポワの色変え
    setTimeout(() => {
      this.changePowaColor();
    }, 2000);
  }
  changePowaColor() {
    const seed = Math.random();
    const blue = "rgba(135, 206, 235, 0.3)";
    const gold = "rgba(255, 215, 0, 0.3)";
    switch (this.targetRarity) {
      case RARITY.R:
        this.powaColor = blue;
        break;
      case RARITY.SR:
      case RARITY.SSR: // TODO 虹できたらそちらに変更
        if (seed < 0.4) {
          this.powaColor = blue;
        } else {
          this.powaColor = gold;
        }
        break;
    }
    this.targetRarity;
  }
  rapidAnimEnd(e: AnimationEvent): void {
    // アニメーション名を前方一致で確認（後ろにはvue特有の文字列がくるため）
    if (e.animationName.indexOf("zoomin-rapid-powa") === 0) {
      (e.target as HTMLElement).classList.add("z0");
    } else if (e.animationName.indexOf("closer-rapid-powa") === 0) {
      this.rCount++;
      if (this.rCount === 9) {
        // 最後のひとつだけ爆発させる
        (e.target as HTMLElement).classList.add("explosion-powa");
      } else {
        // 他は消滅させる
        (e.target as HTMLElement).style.display = "none";
      }
    } else if (e.animationName.indexOf("explosion-powa") === 0) {
      this.$emit("endallanimation");
    }
  }
}
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
  transform: translateZ(300px);
  animation: closer-rapid-powa 2s cubic-bezier(1, 0, 1, 0);
}
.powa-soul.rapid.zoom {
  animation: powapowa 0.2s infinite, zoomin-rapid-powa 0.2s linear,
    closer-rapid-powa 2s cubic-bezier(1, 0, 1, 0) forwards;
}
.explosion-powa {
  left: 50% !important;
  top: 50% !important;
  width: 1px !important;
  background-color: rgba(0, 0, 0, 0);
  animation: closer-rapid-powa 2s cubic-bezier(1, 0, 1, 0) forwards,
    explosion-powa 0.4s forwards !important;
}
/* 
計算式（本当は動的に計算したいが、cssなのでできない）
left: 50-ポワ半径-(半径*COS(RADIANS(40*n(12時が0)+90)))*1.5(アスペクト比の逆)
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
.z0 {
  transform: translateZ(0px) !important;
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
    box-shadow: 0px 0px 2px 2px var(--powa-color), 0px 0px 10px 10px white;
  }
  50% {
    box-shadow: 0px 0px 2px 4px var(--powa-color), 0px 0px 10px 10px white;
  }
  100% {
    box-shadow: 0px 0px 2px 2px var(--powa-color), 0px 0px 10px 10px white;
  }
}
@keyframes zoomin-rapid-powa {
  0% {
    transform: translateZ(300px);
  }
  100% {
    transform: translateZ(0px);
  }
}
@keyframes closer-rapid-powa {
  100% {
    left: 46%;
    top: 46%;
  }
}
@keyframes explosion-powa {
  0% {
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 1),
      0px 0px 0px 0px rgba(255, 255, 255, 1),
      0px 0px 0px 0px rgba(255, 255, 255, 1);
  }
  10% {
    box-shadow: 0px 0px 60px 60px rgba(255, 255, 255, 1),
      0px 0px 0px 0px rgba(255, 255, 255, 1),
      0px 0px 0px 0px rgba(255, 255, 255, 1);
  }
  20% {
    box-shadow: 0px 0px 120px 120px rgba(255, 255, 255, 1),
      0px 0px 60px 60px rgba(255, 255, 255, 1),
      0px 0px 0px 0px rgba(255, 255, 255, 1);
  }
  80% {
    box-shadow: 0px 0px 300px 300px rgba(255, 255, 255, 0.2),
      0px 0px 240px 240px rgba(255, 255, 255, 0.2),
      0px 0px 180px 180px rgba(255, 255, 255, 0.2);
  }
  90% {
    box-shadow: 0px 0px 300px 300px rgba(255, 255, 255, 0.1),
      0px 0px 300px 300px rgba(255, 255, 255, 0.1),
      0px 0px 240px 240px rgba(255, 255, 255, 0.1);
  }
  100% {
    box-shadow: 0px 0px 300px 300px rgba(255, 255, 255, 0),
      0px 0px 300px 300px rgba(255, 255, 255, 0),
      0px 0px 300px 300px rgba(255, 255, 255, 0);
  }
}
</style>
