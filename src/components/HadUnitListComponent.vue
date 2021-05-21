<template>
  <div>
    <v-dialog v-model="dialog" width="1000" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          所持SSR一覧
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          所持SSR一覧
          <v-spacer />
          {{ maskedSSRUnits.filter((v) => v).length }}/{{
            maskedSSRUnits.length
          }}
        </v-card-title>
        <v-card-text>
          <div v-for="(unit, i) in currentPageMaskedSSRUnits" :key="i">
            <v-btn
              v-if="unit"
              text
              color="primary"
              x-small
              @click="
                dialog2 = true;
                currentUnit = unit;
              "
            >
              {{ unit.name.replace("（SSR）", "") }}
            </v-btn>
            <span v-else>？？？</span>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            text
            icon
            :disabled="currentPage === 0"
            @click="addPage(false)"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="text-center">
            {{ currentPage + 1 }}
          </span>
          <v-btn
            color="primary"
            text
            icon
            :disabled="currentPage === maxPage"
            @click="addPage(true)"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card v-if="currentUnit">
        <v-card-title> {{ currentUnit.name.replace("（SSR）", "") }} </v-card-title>
        <v-card-text>
          <v-img :src="currentUnit.pictureurl" />
        </v-card-text>
        <v-card-subtitle bold>コマンドスキル</v-card-subtitle>
        <v-card-text>{{ currentUnit.cs }}</v-card-text>
        <v-card-subtitle>アビリティ</v-card-subtitle>
        <v-card-text>{{ currentUnit.ability }}</v-card-text>
        <v-btn color="primary" text @click="dialog2 = false"> Close </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { UnitInfo } from "@/constants";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HadUnitListComponent extends Vue {
  @Prop() msg!: number;
  @Prop() ssrUnits!: UnitInfo[];
  @Prop() ssrNums!: number[];
  readonly viewNum = 100;
  get maskedSSRUnits(): (UnitInfo | null)[] {
    return this.ssrUnits
      ? this.ssrUnits.map((v, i) => (this.ssrNums[i] > 0 ? v : null))
      : [];
  }
  get currentPageMaskedSSRUnits(): (UnitInfo | null)[] {
    return this.maskedSSRUnits.slice(
      this.currentPage * this.viewNum,
      (this.currentPage + 1) * this.viewNum
    );
  }
  dialog = false;
  dialog2 = false;
  currentUnit = {};
  currentPage = 0;
  get maxPage(): number {
    return this.ssrUnits ? Math.floor(this.ssrUnits.length / this.viewNum) : 0;
  }
  addPage(add: boolean): void {
    add ? this.currentPage++ : this.currentPage--;
    this.currentPage = Math.max(0, Math.min(this.currentPage, this.maxPage));
  }
}
</script>
<style scoped>
</style>