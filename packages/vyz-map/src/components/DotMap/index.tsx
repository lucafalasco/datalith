import { max } from 'd3-array'
import { geoEqualEarth, geoPath, GeoProjection } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { FeatureCollection } from 'geojson'
import { groupBy, map, sum } from 'lodash'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import { DatumVyz } from 'vyz-util'
import dotMap from './dotMap'
import { flatGeometry, isPointInsidePolygon } from './geometry'

const DEFAULT_COLOR = '#000000'

function findFeatureId(coords: [number, number], collection: FeatureCollection): number | string {
  const match = collection.features.find(f =>
    isPointInsidePolygon(coords, flatGeometry(f.geometry)),
  )
  return match && match.id ? match.id : 0
}

interface Props {
  /** Custom css classes to pass to the SVG element */
  className?: string
  /** Width of the SVG */
  width: number
  /** Height of the SVG */
  height: number
  /**
   * Data can be one of:
   * * `Array<{ v?: any, y?: number, z?: string }>`
   * * `Array<number>`
   */
  data: DatumVyz[]
  /** GeoJson */
  featureCollection: FeatureCollection
  /** GeoProjection */
  projection?: GeoProjection
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Grid cell dimension */
  side?: number
  /** Whether to add the fill color */
  fill?: boolean
  /** Whether to add the stroke color */
  stroke?: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: DatumVyz & number) => string
}

interface CircleProps {
  datum?: DatumVyz
  x: number
  y: number
  radius: number
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumVyz) => string
}

const Circle = ({ datum, x, y, radius, stroke, fill, tooltip }: CircleProps) => {
  const color = (datum && datum.z) || DEFAULT_COLOR
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }

  return (
    <g data-tip={tooltip && datum && tooltip(datum)}>
      <circle style={style} cx={x} cy={y} r={radius} />
    </g>
  )
}

export class DotMap extends React.Component<Props> {
  static defaultProps = {
    stroke: false,
    fill: true,
    side: 5,
    projection: geoEqualEarth(),
  }

  getFeatureIdToValues(data: DatumVyz[]): Map<string | number, number> {
    const { featureCollection } = this.props

    // get flat featureId to value map
    const featureIdToValuesFlat = data.map(d => [
      findFeatureId([d.v[0], d.v[1]], featureCollection),
      d.y,
    ])

    // aggregate values with same featureId
    const featureIdToValues = map(groupBy(featureIdToValuesFlat, d => d[0]), (d, k) => [
      k,
      sum(d.map(a => a[1])),
    ])

    return new Map(featureIdToValues as [])
  }

  render() {
    const {
      className,
      tooltip,
      data,
      featureCollection,
      projection = geoEqualEarth(),
      width,
      side = 5,
      height,
      stroke,
      fill,
      center = {
        x: this.props.width / 2,
        y: this.props.height / 2,
      },
    } = this.props

    // DEBUG
    // const path = geoPath().projection(projection)
    // const features = (featureCollection as FeatureCollection).features

    const featureIdToValues = this.getFeatureIdToValues(data)
    const dotMapData = dotMap({
      width,
      height,
      side,
      projection,
      data: featureIdToValues,
      featureCollection: featureCollection as FeatureCollection,
    })

    const radius = scaleLinear()
      .domain([0, max(dotMapData, d => Math.sqrt(d.value)) as number])
      .range([1, side * 0.5])

    return (
      <>
        <svg className={className} width={width} height={height}>
          <g>
            {/* DEBUG */}
            {/* {features.map((f, i) => (
              <path key={i} d={path(f) as string} fill="none" stroke="black" strokeWidth="0.1" />
            ))} */}
            {dotMapData.map((d, i) => {
              function getDatum() {
                if (d.value === 0) {
                  return undefined
                }

                const dataFilteredByFeatureId = data.filter(
                  datum =>
                    findFeatureId(
                      [datum.v[0], datum.v[1]],
                      featureCollection as FeatureCollection,
                    ) === d.featureId,
                )

                return dataFilteredByFeatureId.length > 1
                  ? { ...dataFilteredByFeatureId[0], y: sum(dataFilteredByFeatureId.map(d => d.y)) }
                  : dataFilteredByFeatureId[0]
              }

              return (
                <Circle
                  datum={getDatum()}
                  key={i}
                  x={d.x}
                  y={d.y}
                  radius={radius(Math.sqrt(d.value))}
                  fill={fill}
                  stroke={stroke}
                  tooltip={tooltip}
                />
              )
            })}
          </g>
        </svg>
        <Tooltip html />
      </>
    )
  }
}
