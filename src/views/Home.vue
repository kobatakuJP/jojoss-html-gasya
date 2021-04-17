<template>
  <div class="home">
    <SelectGasyaScene @pull="actionPull" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectGasyaScene from "@/components/SelectGasyaScene.vue"; // @ is an alias to /src

@Component({
  components: {
    SelectGasyaScene,
  },
})
export default class Home extends Vue {
  actionPull(v: number) {
    alert(v)
  }
}
</script>
