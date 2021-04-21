const units = [
  { n: "ディオ" },
  { n: "ジョナサン" }
]
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
  return units[Math.floor(Math.random() * units.length)]
}
