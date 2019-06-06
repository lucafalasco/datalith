import { max } from 'd3-array'
import { geoEqualEarth, geoPath, GeoProjection } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { FeatureCollection } from 'geojson'
import { groupBy, map, sum } from 'lodash'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import { DatumVyz } from 'vyz-util'
import { flatGeometry, isPointInsidePolygon } from '../utils/geometry'
import gridMap from '../utils/gridMap'

const DEFAULT_COLOR = '#000000'

function findFeatureId(coords: [number, number], collection: FeatureCollection): number | string {
  const match = collection.features.find(f =>
    isPointInsidePolygon(coords, flatGeometry(f.geometry)),
  )
  return match && match.id ? match.id : 0
}

export interface GridMapProps {
  /** Custom css classes to pass to the SVG element */
  className?: string
  /** Width of the SVG */
  width: number
  /** Height of the SVG */
  height: number
  /**
   * Data has to be defined like this:
   * * `Array<{ v: [number, number], y: number, z?: string }>`
   */
  data: DatumVyz[]
  /** GeoJson */
  featureCollection: FeatureCollection
  /** GeoProjection */
  projection?: GeoProjection
  /** Grid cell dimension */
  side?: number
  /** Whether to add the fill color */
  fill?: boolean
  /** Whether to add the stroke color */
  stroke?: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: DatumVyz & number) => string
  /** Return custom element to render as data point */
  customRender?: (
    d: { x: number; y: number; value: number; datum?: DatumVyz },
    props: any,
  ) => JSX.Element
}

interface VisualElementProps {
  datum?: DatumVyz
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumVyz) => string
  render(props: any): JSX.Element
}

const VisualElement = ({ datum, stroke, fill, tooltip, render: Element }: VisualElementProps) => {
  const color = (datum && datum.z) || DEFAULT_COLOR
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }

  return <g data-tip={tooltip && datum && tooltip(datum)}>{Element(style)}</g>
}

export class GridMap extends React.Component<GridMapProps> {
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
      customRender,
    } = this.props

    const featureIdToValues = this.getFeatureIdToValues(data)
    const gridMapData = gridMap({
      width,
      height,
      side,
      projection,
      data: featureIdToValues,
      featureCollection: featureCollection as FeatureCollection,
    })

    const yScale = scaleLinear()
      .domain([0, max(gridMapData, d => Math.sqrt(d.value)) as number])
      .range([1, side * 0.5])

    // DEBUG
    // const path = geoPath().projection(projection)
    // const features = (featureCollection as FeatureCollection).features

    return (
      <>
        <svg className={className} width={width} height={height}>
          <g>
            {/* DEBUG */}
            {/* {features.map((f, i) => (
              <path key={i} d={path(f) as string} fill="none" stroke="black" strokeWidth="0.1" />
            ))} */}
            {gridMapData.map((d, i) => {
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

              const datum = getDatum()
              const value = yScale(Math.sqrt(d.value))
              const defaultRender = props => <circle cx={d.x} cy={d.y} r={value} {...props} />
              const render = customRender
                ? props => customRender({ x: d.x, y: d.y, value, datum }, props)
                : defaultRender

              return (
                <VisualElement
                  datum={datum}
                  key={i}
                  fill={fill}
                  stroke={stroke}
                  tooltip={tooltip}
                  render={render}
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
