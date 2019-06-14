function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function genDateValue(n: number) {
  return Array(n)
    .fill(1)
    .map((d, i) => {
      return {
        date: new Date(Date.now() - i * 3600000),
        value: Math.max(250, Math.random() * 3000),
        value2: Math.max(250, Math.random() * 3000),
      }
    })
}

export function genCoordsValue(n: number) {
  return Array(n)
    .fill(1)
    .map((d, i) => {
      return {
        lat: getRandomInt(-90, 90),
        lng: getRandomInt(-180, 180),
        value: Math.max(250, Math.random() * 3000),
      }
    })
}

export function genCoordsValueUs(n: number) {
  return Array(n)
    .fill(1)
    .map((d, i) => {
      return {
        lat: getRandomInt(20, 50),
        lng: getRandomInt(-70, -125),
        value: Math.max(250, Math.random() * 3000),
      }
    })
}

export function genCoordsValueIt(n: number) {
  return Array(n)
    .fill(1)
    .map((d, i) => {
      return {
        lat: getRandomInt(35, 47),
        lng: getRandomInt(8, 17),
        value: Math.max(250, Math.random() * 3000),
      }
    })
}
