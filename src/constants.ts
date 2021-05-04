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
