export const enum GASYA_KIND {
    ZENBU,
    CHO_KORIN,
    KORIN,
    JOJOFES
}
export type UnitInfo = {
  name: string;
  rarity: RARITY;
  pictureurl: string;
};
export enum RARITY {
  SSR = "SSR",
  SR = "SR",
  R = "R",
}
export const enum GASYA_NUM {
  ONE = 1,
  TEN = 10
}
export const LOCALSTORAGE_KEYS = {
  [GASYA_KIND.ZENBU]: {
    [GASYA_NUM.ONE]: "zenbuSinCount",
    [GASYA_NUM.TEN]: "zenbu10Count"
  },
  [GASYA_KIND.CHO_KORIN]: {
    [GASYA_NUM.ONE]: "choKorinSinCount",
    [GASYA_NUM.TEN]: "choKorin10Count"
  },
  [GASYA_KIND.KORIN]: {
    [GASYA_NUM.ONE]: "korinSinCount",
    [GASYA_NUM.TEN]: "korin10Count"
  },
  [GASYA_KIND.JOJOFES]: {
    [GASYA_NUM.ONE]: "jojofesSinCount",
    [GASYA_NUM.TEN]: "jojofes10Count"
  },
  
}