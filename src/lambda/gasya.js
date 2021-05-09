import { units } from "./submodule/unitData";
import { PAR_OF_SR, PAR_OF_SSR } from "./submodule/conf";
const UNITS_SSR = units.filter(v => v.rarity === "SSR");
const UNITS_SR = units.filter(v => v.rarity === "SR");
const UNITS_R = units.filter(v => v.rarity === "R");
const UNITS_CHOKORIN = UNITS_SSR.filter(v => v.howtoget.match(/超降臨[^セ]/));
const UNITS_KORIN = UNITS_SSR.filter(v => v.howtoget.match(/[^超]降臨/));
const UNITS_GENTEI = UNITS_SSR.filter(v => v.howtoget.match(/限定/)).filter(v => !v.ability.match(/レッドライン/)).filter(v => !v.ability.match(/うぬぼれた性格/));
const KIND = {
  ZENBU: 0,
  CHO_KORIN: 1,
  KORIN: 2,
  JOJOFES: 3
}

export function handler(event, context, callback) {
  const num = parseInt(event?.queryStringParameters?.num);
  const kind = parseInt(event?.queryStringParameters?.kind);
  const kakutei = parseInt(event?.queryStringParameters?.kakutei) || 0;
  if (isNaN(num) || isNaN(kind)) {
    callback(null, {
      statusCode: 500
    })
  } else {
    const result = renGasya(num, kind, kakutei)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    })
  }
}

function renGasya(num, kind, kakutei) {
  const result = []
  for (let i = 0; i < num; i++) {
    result.push(gasya(kind));
  }
  const ssrs = result.filter(v => v.rarity === "SSR");
  const remainSSR = kakutei - ssrs.length;
  if (remainSSR > 0) {
    for (let i = 0; i < remainSSR; i++) {
      const unit = gasya(kind, true);
      const raritys = result.map(v => v.rarity);
      const revIdx = raritys.reverse().findIndex(v => v !== "SSR");
      const idx = result.length - 1 - revIdx;
      // remainSSRがある以上findIndexがnotfoundはない
      result[idx] = unit;
    }
  }
  return fixOrder(result);
}

function gasya(kind, forceSSR = false) {
  const s = Math.random();
  if (s < PAR_OF_SSR || forceSSR) {
    switch (kind) {
      case KIND.ZENBU:
        return getRandFromArr(UNITS_SSR)
      case KIND.CHO_KORIN:
        return getRandFromArr(UNITS_CHOKORIN)
      case KIND.KORIN:
        return getRandFromArr(UNITS_KORIN)
      case KIND.JOJOFES:
        return getRandFromArr(UNITS_GENTEI)
      default:
        return getRandFromArr(UNITS_SSR)
    }
  } else if (s < (PAR_OF_SSR + PAR_OF_SR)) {
    return getRandFromArr(UNITS_SR)
  } else {
    return getRandFromArr(UNITS_R)
  }
}

/** 
 * - SSRが1以上あれば最後の1つはかならずSSR
 */
function fixOrder(arr) {
  const raritys = arr.map(v => v.rarity);
  const revIdx = raritys.reverse().findIndex(v => v === "SSR");
  const idx = revIdx === -1 ? -1 : arr.length - 1 - revIdx
  if (idx >= 0) {
    const ssr = arr[idx];
    const lastIdx = arr.length - 1
    arr.splice(idx, 1, arr[lastIdx]);
    arr.splice(lastIdx, 1, ssr);
  }
  return arr;
}

/** 配列からランダムの値を取り出す */
function getRandFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}