import {
  callOrGetValue,
  CommonProps,
  CoordsAccessor,
  Datum,
  ResponsiveWrapper,
  CommonAccessors,
  NumberAccessor,
} from '@datalith/util'
import { geoNaturalEarth1, GeoProjection } from 'd3-geo'
import { FeatureCollection } from 'geojson'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import gridMap from '../../utils/gridMap'

const DEFAULT_VALUE = 10
const DEFAULT_VALUE_INACTIVE = 1
const DEFAULT_FILL_INACTIVE = '#000'
const DEFAULT_FILL_OPACITY_INACTIVE = 0.3
const DEFAULT_STROKE_INACTIVE = 'transparent'
const DEFAULT_STROKE_OPACITY_INACTIVE = 0.3
const DEFAULT_SIDE = 10

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Value Inactive Accessor */
  valueInactive: number
  /** Fill Inactive Accessor */
  fillInactive: string
  /** Fill Opacity Inactive Accessor */
  fillOpacityInactive: number
  /** Stroke Inactive Accessor */
  strokeInactive: string
  /** Stroke Opacity Inactive Accessor */
  strokeOpacityInactive: number
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

interface VisualElementProps {
  datum?: Datum
  fill: string
  fillOpacity: number
  stroke: string
  strokeOpacity: number
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
  const style = { fill, fillOpacity, stroke, strokeOpacity }

  return <g data-tip={tooltip && datum && tooltip(datum)}>{Element(style)}</g>
}

export const GridMap: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
  class GridMap extends React.Component<GridMapProps> {
    static defaultProps: Partial<GridMapProps> = {
      value: DEFAULT_VALUE,
      valueInactive: DEFAULT_VALUE_INACTIVE,
      fillInactive: DEFAULT_FILL_INACTIVE,
      fillOpacityInactive: DEFAULT_FILL_OPACITY_INACTIVE,
      strokeInactive: DEFAULT_STROKE_INACTIVE,
      strokeOpacityInactive: DEFAULT_STROKE_OPACITY_INACTIVE,
      coords: d => d,
      side: DEFAULT_SIDE,
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
        valueInactive,
        featureCollection,
        projection,
        side,
        fill,
        fillInactive,
        fillOpacity,
        fillOpacityInactive,
        stroke,
        strokeInactive,
        strokeOpacity,
        strokeOpacityInactive,
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
                const dimension =
                  d.datum !== undefined ? callOrGetValue(value, d.datum, i) : valueInactive

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
                    fill={d.datum !== undefined ? callOrGetValue(fill, d.datum, i) : fillInactive}
                    fillOpacity={
                      d.datum !== undefined
                        ? callOrGetValue(fillOpacity, d.datum, i)
                        : fillOpacityInactive
                    }
                    stroke={
                      d.datum !== undefined ? callOrGetValue(stroke, d.datum, i) : strokeInactive
                    }
                    strokeOpacity={
                      d.datum !== undefined
                        ? callOrGetValue(strokeOpacity, d.datum, i)
                        : strokeOpacityInactive
                    }
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
