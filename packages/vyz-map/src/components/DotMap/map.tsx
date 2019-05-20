import { max, sum } from 'd3-array'
import { geoPath, GeoProjection } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { Feature, Position } from 'geojson'

const range = (left, right, inclusive) => {
  const range = []
  const ascending = left < right
  const end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}

const flat = (type, arr: Position[][] | Position[][][]) => {
  let m
  const flatten = polygon => polygon.reduce((a, b) => a.concat([[0, 0]].concat(b)))
  switch (type) {
    case 'Polygon':
      m = flatten(arr)
      break
    case 'MultiPolygon':
      m = flatten(
        (() => {
          const result = []
          arr.forEach(polygon => {
            result.push(flatten(polygon))
          })
          return result
        })(),
      )
      break
  }
  return [[0, 0]].concat(m.concat([[0, 0]]))
}

const subGrid = (box, side) => {
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

const isInside = (point, vs) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  const x = point[0]
  const y = point[1]
  let inside = false
  let j = vs.length - 1
  for (let i = 0, end = vs.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
    const xi = vs[i][0]
    const yi = vs[i][1]
    const xj = vs[j][0]
    const yj = vs[j][1]
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) {
      inside = !inside
    }
    j = i
  }
  return inside
}

const gridmap = (
  projection: GeoProjection, // d3.geo projection
  data: Map<number, number>, // d3.map() mapping key to data
  features: Feature[], // array of map features
  isDensity: boolean, // set to `true` if data define a density
  width = 500,
  height = 500,
  side = 10, // side of the cells in pixel
  key = 'id', // name of the attribute mapping features to data
  fill = '#343434',
) => {
  const grid = new Map()

  const chart = selection => {
    let i
    let j
    let value
    let x
    let y
    let k
    const w = width
    const h = height

    const path = geoPath().projection(projection)

    const radius = scaleLinear().range([0, (side / 2) * 0.9])

    const area = new Map()
    const centroid = new Map()
    features.map(f => {
      area.set(f[key], path.area(f) / (w * h))
    })

    // define the grid
    features.map(f => {
      const g = f.geometry
      if (g.type === 'Polygon' || g.type === 'MultiPolygon') {
        const box = path.bounds(f)
        const points = subGrid(box, side)
        value = [f[key]]
        if (points.length) {
          const polygon = flat(g.type, g.coordinates)
          points.map(([i, j]) => {
            x = side * i
            y = side * j
            const coords = projection.invert([x, y])
            const ii = isInside(coords, polygon)
            if (ii) {
              grid.set(i + ',' + j, { keys: value, x, y })
            }
          })
        } else {
          const c = path.centroid(f)
          if (c) {
            centroid.set(f[key], c)
          }
        }
      }
    })

    // add not hitted features to the nearest cell
    centroid.forEach((k, v) => {
      i = Math.floor(v[0] / side)
      j = Math.floor(v[1] / side)
      try {
        return grid.get(i + ',' + j).keys.push(k)
      } catch (error) {}
    })

    const density = a => {
      let num
      let j
      if (isDensity) {
        num = sum(
          (() => {
            const result = []
            for (j of Array.from(a)) {
              result.push(data.get(j) * area.get(j))
            }
            return result
          })(),
        )
      } else {
        num = sum(
          (() => {
            const result1 = []
            for (j of Array.from(a)) {
              result1.push(data.get(j))
            }
            return result1
          })(),
        )
      }
      const den = sum(
        (() => {
          const result2 = []
          for (j of Array.from(a)) {
            result2.push(area.get(j))
          }
          return result2
        })(),
      )
      if (den) {
        return num / den
      } else {
        return 0
      }
    }

    const dataGrid = (() => {
      const result: Array<{ value: number; x: number; y: number }> = []
      for (k of Array.from(grid.values())) {
        if (k.keys.length) {
          result.push({
            value: density(k.keys),
            x: k.x,
            y: k.y,
          })
        }
      }
      return result
    })()

    radius.domain([0, max(dataGrid, d => Math.sqrt(d.value))])
  }

  return chart
}
