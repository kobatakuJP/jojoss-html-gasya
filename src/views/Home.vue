<template>
  <div class="home">
    <SelectGasyaScene msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectGasyaScene from '@/components/SelectGasyaScene.vue'; // @ is an alias to /src

@Component({
  components: {
    SelectGasyaScene,
  },
})
export default class Home extends Vue {}
</script>
