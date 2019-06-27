import { callOrGetValue, Coords, Datum, Value } from '@datalith/util'
import flatten from '@turf/flatten'
import { GeometryCollection } from '@turf/helpers'
import { sum } from 'd3-array'
import { geoPath, GeoProjection } from 'd3-geo'
import { Feature, FeatureCollection } from 'geojson'
import { isPointInsidePolygon } from './geometry'

function getFeatureIdToValues(
  data: Datum[],
  feature: Feature,
  featureIdToValues: Map<string, number>,
  featureIdToDatum: Map<string, Datum>,
  coordsAccessor: Coords,
  valueAccessor: Value,
) {
  const res = data.find((d, i) => {
    const coords = callOrGetValue(coordsAccessor, d, i)
    const flattened = flatten(feature as Feature<GeometryCollection>)
    const polygon = flattened.features[0].geometry.coordinates[0] as Array<[number, number]>
    return isPointInsidePolygon([coords[0], coords[1]], polygon)
  })

  if (res && feature.id) {
    const featureIdValue = featureIdToValues.get(feature.id.toString())
    const value = callOrGetValue(valueAccessor, res) as number
    featureIdToDatum.set(feature.id.toString(), res)
    featureIdToValues.set(feature.id.toString(), featureIdValue ? featureIdValue + value : value)
  }
}

const range = (left: number, right: number, inclusive: boolean) => {
  const range: number[] = []
  const ascending = left < right
  const end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}

const subGrid = (box: [[number, number], [number, number]], side: number) => {
  const x = 1 + Math.floor(box[0][0] / side)
  const y = 1 + Math.floor(box[0][1] / side)
  const x1 = Math.floor(box[1][0] / side)
  const y1 = Math.floor(box[1][1] / side)
  if (x1 >= x && y1 >= y) {
    return range(y, y1, true)
      .map(j => range(x, x1, true).map(i => [i, j]))
      .reduce((a, b) => a.concat(b))
  } else {
    return []
  }
}

interface GridMapConfig {
  projection: GeoProjection // d3.geo projection
  data: Datum[] // d3.map() mapping key to data
  coords: Coords
  value: Value
  featureCollection: FeatureCollection // array of map features
  isDensity?: boolean // set to `true` if data define a density
  width?: number
  height?: number
  side?: number // side of the cells in pixel
  key?: string // name of the attribute mapping features to data
}

export default function gridMap({
  projection,
  data,
  coords: coordsAccessor,
  value: valueAccessor,
  featureCollection,
  isDensity = true,
  width = 1000,
  height = 1000,
  side = 5,
  key = 'id',
}: GridMapConfig) {
  const grid: Map<
    string,
    { keys: string[]; x: number; y: number; i: number; j: number; featureId: string }
  > = new Map()
  const features = featureCollection.features
  const featureIdToValues = new Map<string, number>()
  const featureIdToDatum = new Map<string, Datum>()

  projection.fitSize([width, height], featureCollection)
  const path = geoPath().projection(projection)

  const area: Map<string, number> = new Map()
  const centroid: Map<string, [number, number]> = new Map()

  features.map(f => {
    area.set(f[key].toString(), path.area(f) / (width * height))
  })

  // define the grid
  features.map((f, i) => {
    getFeatureIdToValues(
      data,
      f,
      featureIdToValues,
      featureIdToDatum,
      coordsAccessor,
      valueAccessor,
    )
    const g = f.geometry
    if (g.type === 'Polygon' || g.type === 'MultiPolygon') {
      const box = path.bounds(f)
      const points = subGrid(box, side)
      const featureId = f[key].toString()
      const keys = [featureId]
      if (points.length) {
        const p = path(f)
        const polygonsCommands = p ? p.split(/(?=[M])/) : []
        const polygons = polygonsCommands.map(pathString => {
          const commands = pathString.split(/(?=[LMCZ])/)

          return commands.map((c, i, a) => {
            const command = c.slice(0, 1)
            const coords = command === 'Z' ? a[0] : c

            return coords
              .slice(1)
              .split(',')
              .map(c => parseFloat(c)) as [number, number]
          })
        })

        points.forEach(([i, j]) => {
          const x = side * i
          const y = side * j
          const isInside = polygons.some(polygon => isPointInsidePolygon([x, y], polygon))
          if (isInside) {
            grid.set(i + ',' + j, { x, y, i, j, keys, featureId })
          }
        })
      } else {
        const c = path.centroid(f)
        if (c) {
          centroid.set(f[key].toString(), c)
        }
      }
    } else {
      throw new Error(
        `Found incompatible 'geometry.type' for GeoJson: Type '${g.type}' is not supported`,
      )
    }
  })

  // add not hitted features to the nearest cell
  centroid.forEach((v, k) => {
    const i = Math.floor(v[0] / side)
    const j = Math.floor(v[1] / side)
    const cell = grid.get(i + ',' + j)
    if (cell) {
      cell.keys.push(k)
    }
  })

  const density = (keys: string[]): number => {
    let num: number

    if (isDensity) {
      num = sum(keys.map(j => (featureIdToValues.get(j) as number) * (area.get(j) as number)))
    } else {
      num = sum(keys.map(j => featureIdToValues.get(j)))
    }

    const den = sum(keys.map(j => area.get(j)))

    if (den) {
      return num / den
    } else {
      return 0
    }
  }

  return Array.from(grid.values())
    .filter(d => d.keys.length)
    .map(d => ({
      x: d.x,
      y: d.y,
      i: d.i,
      j: d.j,
      value: density(d.keys),
      featureId: d.featureId,
      datum: featureIdToDatum.get(d.featureId),
    }))
}
