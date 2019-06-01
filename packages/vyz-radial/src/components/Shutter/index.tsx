import { range } from 'lodash'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import { DatumDiscrete, DatumVyz, isDatumVyz } from 'vyz-util'

const DEFAULT_COLOR = '#000000'
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
   * * `Array<string>`
   */
  data: DatumDiscrete[]
  /** Center of the visualization */
  center?: { x: number; y: number }
  radiusInner?: number
  radiusOuter?: number
  /** Whether to add the fill color */
  fill: boolean
  /** Whether to add the stroke color */
  stroke?: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: DatumVyz & DatumDiscrete) => string
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
  datum: DatumDiscrete
  dataLength: number
  radiusInner: number
  radiusOuter: number
  index: number
  center: { x: number; y: number }
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumDiscrete) => string
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
  stroke,
  fill,
  tooltip,
}: PolygonProps) => {
  const theta = 0 // Angle (deg) that determines how the entire shutter is rotated: increasing theta will rotate the entire shutter counterclockwise
  const OM = radiusInner * Math.cos(Math.PI / dataLength) // lenght of the segment that link the center of the circle to the midpoint of a side of the inner (small) polygon
  const alpha = Math.acos(OM / radiusOuter!) + Math.PI / dataLength + theta // angle of rotation of the inner polygon (small)

  const polygonBig = createPolygon(dataLength, radiusOuter!, theta, center)
  const polygonSmall = createPolygon(dataLength, radiusInner!, alpha, center)

  const j = index === dataLength - 1 ? 0 : index + 1
  const d = { p0: polygonBig[index], p1: polygonBig[j], p2: polygonSmall[index] }

  const color = isDatumVyz(datum) ? datum.z || DEFAULT_COLOR : datum
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

export class Shutter extends React.Component<Props> {
  static defaultProps = {
    stroke: false,
    fill: true,
  }

  render() {
    const defaultRadius = (Math.min(this.props.width, this.props.height) / 2) * 0.7
    const {
      className,
      tooltip,
      data,
      width,
      height,
      stroke,
      fill,
      radiusInner = defaultRadius * 0.8,
      radiusOuter = defaultRadius,
      center = {
        x: this.props.width / 2,
        y: this.props.height / 2,
      },
    } = this.props

    return (
      <>
        <svg
          className={className}
          width={width}
          height={height}
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          {data.map((datum, i) => (
            <Polygon
              key={i}
              index={i}
              center={center}
              datum={datum}
              dataLength={data.length}
              radiusInner={radiusInner}
              radiusOuter={radiusOuter}
              stroke={stroke}
              fill={fill}
              tooltip={tooltip}
            />
          ))}
        </svg>
        <Tooltip html />
      </>
    )
  }
}
