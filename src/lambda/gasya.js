import { units } from "./unitData";
import { PAR_OF_SR, PAR_OF_R, PAR_OF_SSR } from "./conf";
const UNITS_SSR = units.filter(v => v.rarity === "SSR");
const UNITS_SR = units.filter(v => v.rarity === "SR");
const UNITS_R = units.filter(v => v.rarity === "R");

export function handler(event, context, callback) {
  const num = parseInt(event?.queryStringParameters?.num);
  if (isNaN(num)) {
    callback(null, {
      statusCode: 500
    })
  } else {
    const result = renGasya(num)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    })
  }
}
function renGasya(num) {
  const result = []
  for (let i = 0; i < num; i++) {
    result.push(gasya());
  }
  return result;
}

function gasya() {
  const s = Math.random();
  if (s < PAR_OF_SSR) {
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