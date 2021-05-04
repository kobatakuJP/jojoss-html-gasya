<script lang="ts">
import { RARITY, UnitInfo } from "@/constants";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AbstractScene extends Vue {
  @Prop() result!: UnitInfo[];
  /** 画面クリックで終了するか否か */
  clickToDone = false;
  /** 表示後に何msでdoneになるか。-1で無効。 ※アニメーション後に終了させたい場合はこのプロパティでなくonanimationendでthis.done()を実行する */
  timeoutForDone = -1;
  private timeoutID = -1;
  get currenRarity(): RARITY {
    return this.result
      ? this.result
          .map((v) => v.rarity)
          .reduce((p, c) => (p.length > c.length ? p : c))
      : RARITY.R;
  }
  onclick(): void {
    if (this.clickToDone) {
      this.done();
    }
  }
  mounted(): void {
    // タイムアウトが設定されている場合はマウント時点からカウントダウンする
    if (this.timeoutForDone > -1) {
      this.timeoutID = setTimeout(this.done, this.timeoutForDone);
    }
  }
  done(): void {
    clearTimeout(this.timeoutID);
    this.$emit("done", this.constructor.name);
  }
}
</script>

