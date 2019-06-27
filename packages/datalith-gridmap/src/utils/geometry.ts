export function isPointInsidePolygon(point: [number, number], polygon: number[][]): boolean {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  const x = point[0]
  const y = point[1]
  let inside = false
  let j = polygon.length - 1
  for (
    let i = 0, end = polygon.length - 1, asc = 0 <= end;
    asc ? i <= end : i >= end;
    asc ? i++ : i--
  ) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xj = polygon[j][0]
    const yj = polygon[j][1]
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) {
      inside = !inside
    }
    j = i
  }
  return inside
}
