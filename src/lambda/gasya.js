import { units } from "./unitData";
import { PAR_OF_SR, PAR_OF_SSR } from "./conf";
const UNITS_SSR = units.filter(v => v.rarity === "SSR");
const UNITS_SR = units.filter(v => v.rarity === "SR");
const UNITS_R = units.filter(v => v.rarity === "R");
const UNITS_CHOKORIN = UNITS_SSR.filter(v => v.howtoget.match(/超降臨[^セ]/));
const UNITS_KORIN = UNITS_SSR.filter(v => v.howtoget.match(/[^超]降臨/));
const UNITS_GENTEI = UNITS_SSR.filter(v => v.howtoget.match(/限定/));
const KIND = {
  ZENBU: 0,
  CHO_KORIN: 1,
  KORIN: 2,
  JOJOFES: 3
}

export function handler(event, context, callback) {
  const num = parseInt(event?.queryStringParameters?.num);
  const kind = parseInt(event?.queryStringParameters?.kind);
  if (isNaN(num) || isNaN(kind)) {
    callback(null, {
      statusCode: 500
    })
  } else {
    const result = renGasya(num, kind)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    })
  }
}
function renGasya(num, kind) {
  const result = []
  for (let i = 0; i < num; i++) {
    result.push(gasya(kind));
  }
  return result;
}

function gasya(kind) {
  const s = Math.random();
  if (s < PAR_OF_SSR) {
    switch (kind) {
      case KIND.ZENBU:
        return getRandFromArr(UNITS_SSR)
      case KIND.CHO_KORIN:
        return getRandFromArr(UNITS_CHOKORIN)
      case KIND.KORIN:
        return getRandFromArr(UNITS_KORIN)
      case KIND.JOJOFES:
        return getRandFromArr(UNITS_GENTEI)
    }
    return getRandFromArr(UNITS_SSR)
  } else if (s < (PAR_OF_SSR + PAR_OF_SR)) {
    return getRandFromArr(UNITS_SR)
  } else {
    return getRandFromArr(UNITS_R)
  }
}

function getRandFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}