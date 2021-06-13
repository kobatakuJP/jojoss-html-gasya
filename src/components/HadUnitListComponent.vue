<template>
  <div>
    <v-dialog v-model="unitListDialog" width="1000" scrollable>
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
          <v-btn color="error" text icon @click="removeUnitsDialog = true">
            <v-icon>mdi-delete-alert</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-for="(unit, i) in currentPageMaskedSSRUnits" :key="i">
            <v-btn
              v-if="unit"
              text
              color="primary"
              x-small
              @click="
                unitDetailDialog = true;
                currentUnit = unit;
              "
            >
              {{ removePrefix(unit.name) }}
            </v-btn>
            <span v-else>？？？</span>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="unitListDialog = false">
            Close
          </v-btn>
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
    <v-dialog v-model="unitDetailDialog" max-width="500px">
      <v-card
        v-touch="{
          left: () => moveCurrentUnit(true),
          right: () => moveCurrentUnit(false),
        }"
      >
        <v-card-title>
          {{ removePrefix(currentUnit.name) }}
        </v-card-title>
        <v-card-text>
          <v-img :src="currentUnit.pictureurl" />
        </v-card-text>
        <v-card-subtitle bold>コマンドスキル</v-card-subtitle>
        <v-card-text>{{ currentUnit.cs }}</v-card-text>
        <v-card-subtitle>アビリティ</v-card-subtitle>
        <v-card-text>{{ currentUnit.ability }}</v-card-text>
        <v-btn color="primary" text @click="unitDetailDialog = false">
          Close
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="removeUnitsDialog" max-width="500px">
      <v-card>
        <v-card-title bold>所持SSR情報を削除しますか？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="removeUnitsDialog = false">
            いいえ
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="clickRemove"> 削除 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
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
  unitListDialog = false;
  unitDetailDialog = false;
  removeUnitsDialog = false;
  currentUnit: UnitInfo = this.ssrUnits[0];
  currentPage = 0;
  get maxPage(): number {
    return this.ssrUnits ? Math.floor(this.ssrUnits.length / this.viewNum) : 0;
  }
  addPage(add: boolean): void {
    add ? this.currentPage++ : this.currentPage--;
    this.currentPage = Math.max(0, Math.min(this.currentPage, this.maxPage));
  }
  /**
   * current unitを所持済みの前後に移動
   * @param next 次の時はtrue、前の時はfalse
   */
  moveCurrentUnit(next: boolean): void {
    const i = this.maskedSSRUnits.findIndex(
      (v) => v?.name === this.currentUnit.name
    );
    const moveToUnit = next
      ? this.maskedSSRUnits.slice(i + 1).filter((v) => v)[0]
      : this.maskedSSRUnits
          .slice(0, i)
          .reverse()
          .filter((v) => v)[0];
    if (moveToUnit) this.currentUnit = moveToUnit;
  }
  removePrefix(str: string) {
    return str ? str.replace("（SSR）", "") : str;
  }
  clickRemove() {
    this.$emit("removeUnits");
    this.removeUnitsDialog = false;
  }
}
</script>
<style scoped>
</style>