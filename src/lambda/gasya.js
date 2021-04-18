const units = [
  { n: "ディオ" },
  { n: "ジョナサン" }
]
export function handler(event, context, callback) {
  const result = renGasya(1)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result)
  })
}
function renGasya(num) {
  const result = []
  for (let i = 0; i < num; i++) {
    result.push(gasya());
  }
  return result;
}

function gasya() {
  return units[Math.floor(Math.random() * units.length)]
}
