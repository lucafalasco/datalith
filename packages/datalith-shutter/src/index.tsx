import { callOrGetValue, Color, CommonProps, Datum, ResponsiveWrapper } from '@datalith/util'
import { range } from 'lodash'
import * as React from 'react'
import Tooltip from 'react-tooltip'

const DEFAULT_COLOR = '#000000'
interface Props extends CommonProps {
  /** Color Accessor */
  color: Color

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

interface PolygonProps {
  datum: Datum
  color: Color
  index: number
  dataLength: number
  fill: boolean
  stroke: boolean
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
  color: colorAccessor,
  dataLength,
  index,
  center,
  radiusInner,
  radiusOuter,
  fill,
  stroke,
  tooltip,
}: PolygonProps) => {
  const theta = 0 // Angle (deg) that determines how the entire shutter is rotated: increasing theta will rotate the entire shutter counterclockwise
  const OM = radiusInner * Math.cos(Math.PI / dataLength) // lenght of the segment that link the center of the circle to the midpoint of a side of the inner (small) polygon
  const alpha = Math.acos(OM / radiusOuter!) + Math.PI / dataLength + theta // angle of rotation of the inner polygon (small)

  const polygonBig = createPolygon(dataLength, radiusOuter!, theta, center)
  const polygonSmall = createPolygon(dataLength, radiusInner!, alpha, center)

  const j = index === dataLength - 1 ? 0 : index + 1
  const d = { p0: polygonBig[index], p1: polygonBig[j], p2: polygonSmall[index] }

  const color = callOrGetValue(colorAccessor, datum, index)
  const polygonStyle = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }

  const points = getPolygonPoints(d)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <polygon points={points} style={polygonStyle} />
    </g>
  )
}

export const Shutter = ResponsiveWrapper(
  class Shutter extends React.Component<Props> {
    static defaultProps = {
      color: d => d,
    }

    render() {
      const defaultRadius = (Math.min(this.props.size.width, this.props.size.height) / 2) * 0.7
      const {
        className,
        style,
        data,
        color,
        fill,
        stroke,
        size: { width, height },
        tooltip,
        radiusInner = defaultRadius * 0.8,
        radiusOuter = defaultRadius,
        center = {
          x: width / 2,
          y: height / 2,
        },
      } = this.props

      return (
        <>
          <svg className={className} style={style}>
            {data.map((datum, i) => (
              <Polygon
                key={i}
                index={i}
                center={center}
                datum={datum}
                color={color}
                dataLength={data.length}
                radiusInner={radiusInner}
                radiusOuter={radiusOuter}
                fill={fill}
                stroke={stroke}
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
