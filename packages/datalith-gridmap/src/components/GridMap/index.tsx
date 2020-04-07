import {
  callOrGetValue,
  CommonProps,
  CoordsAccessor,
  Datum,
  ResponsiveWrapper,
  CommonAccessors,
  NumberAccessor,
} from '@datalith/util'
import { max } from 'd3-array'
import { geoNaturalEarth1, geoPath, GeoProjection } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { FeatureCollection } from 'geojson'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import gridMap from '../../utils/gridMap'

const DEFAULT_VALUE = 10

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Coords Accessor */
  coords: CoordsAccessor
  /** GeoJson */
  featureCollection: FeatureCollection
  /** GeoProjection */
  projection: GeoProjection
  /** Grid cell dimension */
  side: number
  /** Return custom element to render as data point */
  customRender?: (
    d: { x: number; y: number; i: number; j: number; value: number; datum?: Datum },
    props: any,
  ) => JSX.Element
}

export type GridMapProps = Props & CommonProps

interface VisualElementProps extends CommonAccessors {
  datum?: Datum
  tooltip?: (d: Datum) => string
  render: (props: any) => JSX.Element
}

const VisualElement = ({
  datum,
  fill,
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
  render: Element,
}: VisualElementProps) => {
  const style = {
    fill: callOrGetValue(fill, datum),
    fillOpacity: callOrGetValue(fillOpacity, datum),
    stroke: callOrGetValue(stroke, datum),
    strokeOpacity: callOrGetValue(strokeOpacity, datum),
  }

  return <g data-tip={tooltip && datum && tooltip(datum)}>{Element(style)}</g>
}

export const GridMap: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
  class GridMap extends React.Component<GridMapProps> {
    static defaultProps: Partial<GridMapProps> = {
      value: DEFAULT_VALUE,
      coords: d => d,
      side: 5,
      projection: geoNaturalEarth1(),
    }

    render() {
      const {
        className,
        style,
        additionalElements,
        data,
        coords,
        value,
        featureCollection,
        projection,
        side,
        fill,
        fillOpacity,
        stroke,
        strokeOpacity,
        tooltip,
        customRender,
        size: { width, height },
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            width={width}
            height={height}
          >
            {additionalElements}
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
                    key={i}
                    fill={fill}
                    fillOpacity={fillOpacity}
                    stroke={stroke}
                    strokeOpacity={strokeOpacity}
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
  },
)
