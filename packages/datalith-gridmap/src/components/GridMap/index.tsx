import { callOrGetValue, Color, Coords, Datum, Value } from '@datalith/util'
import { max } from 'd3-array'
import { geoNaturalEarth1, geoPath, GeoProjection } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { FeatureCollection } from 'geojson'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import gridMap from '../../utils/gridMap'

const DEFAULT_COLOR = '#000000'
const DEFAULT_VALUE = 10

export interface GridMapProps {
  /** Custom css classes to pass to the SVG element */
  className?: string
  /** Width of the SVG */
  width: number
  /** Height of the SVG */
  height: number
  /** Data array */
  data: Datum[]
  /** Value Accessor */
  value: Value
  /** Color Accessor */
  color: Color
  /** Coords Accessor */
  coords: Coords
  /** GeoJson */
  featureCollection: FeatureCollection
  /** GeoProjection */
  projection: GeoProjection
  /** Grid cell dimension */
  side: number
  /** Whether to add the fill color */
  fill: boolean
  /** Whether to add the stroke color */
  stroke: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: Datum) => string
  /** Return custom element to render as data point */
  customRender?: (
    d: { x: number; y: number; i: number; j: number; value: number; datum?: Datum },
    props: any,
  ) => JSX.Element
}

interface VisualElementProps {
  datum?: Datum
  color: Color
  fill: boolean
  stroke: boolean
  tooltip?: (d: Datum) => string
  render(props: any): JSX.Element
}

const VisualElement = ({
  datum,
  color: colorAccessor,
  stroke,
  fill,
  tooltip,
  render: Element,
}: VisualElementProps) => {
  const color = callOrGetValue(colorAccessor, datum)
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }

  return <g data-tip={tooltip && datum && tooltip(datum)}>{Element(style)}</g>
}

export class GridMap extends React.Component<GridMapProps> {
  static defaultProps: Partial<GridMapProps> = {
    value: DEFAULT_VALUE,
    color: DEFAULT_COLOR,
    coords: d => d,
    fill: true,
    stroke: false,
    side: 5,
    projection: geoNaturalEarth1(),
  }

  render() {
    const {
      className,
      data,
      coords,
      value,
      color,
      featureCollection,
      projection,
      width,
      side,
      height,
      fill,
      stroke,
      tooltip,
      customRender,
    } = this.props

    const gridMapData = gridMap({
      width,
      height,
      side,
      projection,
      data,
      coords,
      value,
      featureCollection,
    })

    const yScale = scaleLinear()
      .domain([0, max(gridMapData, (d, i) => Math.sqrt(callOrGetValue(value, d, i))) as number])
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
              const dimension = yScale(Math.sqrt(callOrGetValue(value, d)))
              const defaultRender = props => <circle cx={d.x} cy={d.y} r={dimension} {...props} />
              const render = customRender
                ? props =>
                    customRender(
                      { x: d.x, y: d.y, i: d.i, j: d.j, value: dimension, datum: d.datum },
                      props,
                    )
                : defaultRender

              return (
                <VisualElement
                  datum={d.datum}
                  color={color}
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
