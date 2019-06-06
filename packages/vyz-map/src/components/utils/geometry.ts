import { Geometry, MultiPolygon, Polygon, Position } from 'geojson'

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

export function flatGeometry(geometry: Geometry): Array<[number, number]> {
  const flattenPolygon = (coords: Polygon['coordinates']) => {
    return coords.reduce((accumulator, currentValue) =>
      accumulator.concat([[0, 0]].concat(currentValue)),
    )
  }

  let result: Position[] = []
  switch (geometry.type) {
    case 'Polygon':
      result = flattenPolygon(geometry.coordinates)
      break
    case 'MultiPolygon':
      result = flattenPolygon(geometry.coordinates.map(coordinates => flattenPolygon(coordinates)))
      break
    default:
      throw new Error(
        `Found incompatible 'geometry.type' for GeoJson: Type '${geometry.type}' is not supported`,
      )
  }
  return [[0, 0]].concat(result.concat([[0, 0]])) as Array<[number, number]>
}
