<template>
  <div>{{result}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResultScene extends Vue {
  @Prop() private result!: string;
}
</script>

<style scoped>
</style>
