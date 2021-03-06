import { units } from "./submodule/unitData";
import { PAR_OF_SR, PAR_OF_SSR } from "./submodule/conf";
import {isJpnAprilFool} from "./submodule/utils";
const viran_units = units.filter(v => v.name.match(/ディオ|カーズ|DIO|ＤＩＯ|吉影|浩作|ディアボロ/) )
const baseUnits = isJpnAprilFool() ? viran_units : units;
const UNITS_SSR = baseUnits.filter(v => v.rarity === "SSR");
const UNITS_SR = baseUnits.filter(v => v.rarity === "SR");
const UNITS_R = baseUnits.filter(v => v.rarity === "R");
const UNITS_CHOKORIN = UNITS_SSR.filter(v => v.howtoget.match(/超降臨[^セ]/));
const UNITS_KORIN = UNITS_SSR.filter(v => v.howtoget.match(/[^超]降臨/));
const UNITS_GENTEI = UNITS_SSR.filter(v => v.howtoget.match(/限定/)).filter(v => !v.ability.match(/レッドライン/)).filter(v => !v.ability.match(/うぬぼれた性格/));
const UNITS_FES8 = UNITS_SSR.filter(v => v.name.match(/ジョナサン|ジョセフ|承太郎|仗助|ジョルノ|徐倫/))
const UNITS_CHOKORIN_PU_NAMES = ["（SSR）空条承太郎【金】（終止符を打つ者）", "（SSR）ジョルノ・ジョバァーナ（ゴールド・E・レクイエム）", "（SSR）東方仗助（射程距離内に………入ったぜ………）", "（SSR）ジョナサン・ジョースター＆ジョセフ・ジョースター【白】", "（SSR）空条徐倫（「ストーン・フリー」）"]
const UNITS_CHOKORIN_PU = UNITS_SSR.filter(v => UNITS_CHOKORIN_PU_NAMES.some(t => t === v.name));
const UNIT_CHOKORIN_GENSEN = UNITS_SSR.find(v => v.name === "（SSR）ウェザー・リポート（天候を自由に操れること…）")
const KIND = {
  ZENBU: 0,
  CHO_KORIN: 1,
  KORIN: 2,
  JOJOFES: 3,
  FES8: 4
}
export function handler(event, context, callback) {
  const num = parseInt(event?.queryStringParameters?.num);
  const kind = parseInt(event?.queryStringParameters?.kind);
  const kakutei = parseInt(event?.queryStringParameters?.kakutei) || 0;
  const pu = parseInt(event?.queryStringParameters?.pu) || 0;
  const gensen = parseInt(event?.queryStringParameters?.gensen) || 0;
  if (isNaN(num) || isNaN(kind)) {
    callback(null, {
      statusCode: 500
    })
  } else {
    const result = renGasya(num, kind, kakutei, pu, gensen)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    })
  }
}

function renGasya(num, kind, kakutei, pu, gensen) {
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
  overridePUGensen(result, kind, pu, gensen);
  rafflePlusOne(result);
  // raffleBitethe(result); TODO バイツァ実装時にアンコメント
  return fixOrder(result);
}

function gasya(kind, forceSSR = false) {
  // return UNITS_SSR[UNITS_SSR.length-1] // 新ユニッテスト時はここをアンコメント
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
      case KIND.FES8:
        return getRandFromArr(UNITS_FES8)
      default:
        return getRandFromArr(UNITS_SSR)
    }
  } else if (s < (PAR_OF_SSR + PAR_OF_SR)) {
    return getRandFromArr(UNITS_SR)
  } else {
    return getRandFromArr(UNITS_R)
  }
}

function overridePUGensen(result, kind, pu, gensen) {
  const n = pu + gensen;
  let idxs = []
  result.forEach((v, i) => { if (v.rarity !== "SSR") idxs.push(i) })
  for (let i = result.length - 1; i >= 0 && idxs.length < n; i--) {
    if (!idxs.some(v => i === v)) idxs.push(i);
  }
  for (let i = 0; i < pu; i++) {
    switch (kind) {
      case KIND.ZENBU:
      case KIND.CHO_KORIN:
        const idx = getRandFromArrAndDel(idxs);
        result[idx] = getRandFromArr(UNITS_CHOKORIN_PU);
      default:
      // なにもしない
    }
  }
  for (let i = 0; i < gensen; i++) {
    switch (kind) {
      case KIND.ZENBU:
      case KIND.CHO_KORIN:
        const idx = getRandFromArrAndDel(idxs);
        result[idx] = UNIT_CHOKORIN_GENSEN;
      default:
      // なにもしない
    }
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

/** 配列からランダムの値を取り出し配列から消す(破壊的) */
function getRandFromArrAndDel(arr) {
  const rand = getRandFromArr(arr);
  arr.splice(arr.findIndex(v => v === rand), 1)
  return rand;
}

/** 
 * +1抽選(破壊的変更) 
 * @return 破壊後の配列
 */
function rafflePlusOne(result) {
  result.forEach(v => {
    if (winRaffle(0.2)) {
      v.p1 = true;
    }
  })
  return result;
}

/** 
 * 当選判定 
 * @param probability 0~1の確率値を入力
 */
function winRaffle(probability) {
  return Math.random() < probability;
}

/** 
 * バイツァ抽選(破壊的変更) 
 * @return 破壊後の配列
 */
function raffleBitethe(result) {
  const prob = 0.5; // バイツァの確率
  let i = 0; // バイツァ回数
  for (; i < 4; i++) {
    // バイツァ回数を抽選
    if (!winRaffle(prob)) break;
  }
  if (i) result[selectBitetheUnitIdx(result)].b = i;
  return result;
}

function selectBitetheUnitIdx(result) {
  const unit = getRandFromArr(result.filter(u => u.rarity === 'SSR'))
  return result.findIndex(v => v === unit)
}