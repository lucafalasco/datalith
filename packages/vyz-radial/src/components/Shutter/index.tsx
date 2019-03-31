import { sortBy } from 'lodash'
import { range } from 'lodash'
import * as React from 'react'
import * as Tooltip from 'react-tooltip'

const DEFAULT_COLOR = '#000000'
interface Props {
  /**
   * Pass custom css classes to the SVG element
   */
  className?: string
  /**
   * Width of the SVG
   */
  width: number
  /**
   * Height of the SVG
   */
  height: number
  /**
   * Data must be defined as an array of objects defined like this:
   * { v?: any, y?: number, z?: string }
   */
  data: Datum[]
  /**
   * Center of the visualization
   */
  center?: { x: number; y: number }
  /**
   * Radius
   */
  radiusInner?: number
  radiusOuter?: number
  /**
   * Optional function to sort elements
   */
  sortFn?: (d: Datum) => any
  /**
   * Whether to add the fill color
   */
  fill?: boolean
  /**
   * Whether to add the stroke color
   */
  stroke?: boolean
  /**
   * An optional function that returns an HTML string to be display as the element is hovered
   */
  tooltip?: (d: Datum) => string
}

interface Datum {
  v?: any
  y?: number
  z?: string
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
  dataLength: number
  radiusInner: number
  radiusOuter: number
  index: number
  center: { x: number; y: number }
  stroke?: boolean
  fill?: boolean
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

  const polygonStyle = {
    fill: fill ? datum.z || DEFAULT_COLOR : 'transparent',
    stroke: stroke ? datum.z || DEFAULT_COLOR : 'transparent',
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
    sortFn: (d: Datum) => d,
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
      sortFn,
      stroke,
      fill,
      radiusInner = defaultRadius - 50,
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
          {(sortBy(data, sortFn!) as Datum[]).map((datum, i) => (
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
