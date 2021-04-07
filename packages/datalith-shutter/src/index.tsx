import {
  callOrGetValue,
  CommonProps,
  Datum,
  ResponsiveWrapper,
  CommonAccessors,
} from '@datalith/util'
import { range } from 'lodash'
import * as React from 'react'
import Tooltip from 'react-tooltip'

interface Props extends CommonProps {
  radiusInner?: number
  radiusOuter?: number
  /** Center of the visualization */
  center?: { x: number; y: number }
}

interface Coords {
  x: number
  y: number
}

interface Polygon {
  p0: Coords
  p1: Coords
  p2: Coords
}

interface PolygonProps extends CommonAccessors {
  datum: Datum
  index: number
  dataLength: number
  radiusInner: number
  radiusOuter: number
  center: { x: number; y: number }
  tooltip?: (d: Datum) => string
}

function createPolygon(n: number, radius: number, offsetRad: number, center: Coords): Coords[] {
  const polygon = range(n).map((_, i) => {
    const theta = (i / n) * 2 * Math.PI + offsetRad
    const x = radius * Math.cos(theta) + center.x
    const y = radius * Math.sin(theta) + center.y
    return { x, y }
  })
  return polygon
}

const getPolygonPoints = (polygon: Polygon): string => {
  const points = [polygon.p0, polygon.p1, polygon.p2]
  return points.map(p => `${p.x},${p.y}`).join(' ')
}

const Polygon = ({
  datum,
  dataLength,
  index,
  center,
  radiusInner,
  radiusOuter,
  fill,
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
}: PolygonProps) => {
  const theta = 0 // Angle (deg) that determines how the entire shutter is rotated: increasing theta will rotate the entire shutter counterclockwise
  const OM = radiusInner * Math.cos(Math.PI / dataLength) // lenght of the segment that link the center of the circle to the midpoint of a side of the inner (small) polygon
  const alpha = Math.acos(OM / radiusOuter!) + Math.PI / dataLength + theta // angle of rotation of the inner polygon (small)

  const polygonBig = createPolygon(dataLength, radiusOuter!, theta, center)
  const polygonSmall = createPolygon(dataLength, radiusInner!, alpha, center)

  const j = index === dataLength - 1 ? 0 : index + 1
  const d = { p0: polygonBig[index], p1: polygonBig[j], p2: polygonSmall[index] }

  const style = {
    fill: callOrGetValue(fill, datum, index),
    fillOpacity: callOrGetValue(fillOpacity, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    strokeOpacity: callOrGetValue(strokeOpacity, datum, index),
  }

  const points = getPolygonPoints(d)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <polygon points={points} style={style} />
    </g>
  )
}

export const Shutter: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
  class Shutter extends React.Component<Props> {
    static defaultProps = {
      fill: d => d,
    }

    render() {
      const defaultRadius = (Math.min(this.props.size.width, this.props.size.height) / 2) * 0.4
      const {
        className,
        style,
        additionalElements,
        data,
        fill,
        fillOpacity,
        stroke,
        strokeOpacity,
        tooltip,
        radiusInner = defaultRadius,
        radiusOuter = defaultRadius + 50,
        size: { width, height },
        center = {
          x: width / 2,
          y: height / 2,
        },
      } = this.props

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
            {data.map((datum, i) => (
              <Polygon
                key={i}
                index={i}
                center={center}
                datum={datum}
                dataLength={data.length}
                radiusInner={radiusInner}
                radiusOuter={radiusOuter}
                fill={fill}
                fillOpacity={fillOpacity}
                stroke={stroke}
                strokeOpacity={strokeOpacity}
                tooltip={tooltip}
              />
            ))}
          </svg>
          <Tooltip html />
        </>
      )
    }
  },
)
