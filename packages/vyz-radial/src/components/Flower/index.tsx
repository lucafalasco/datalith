import * as React from 'react'
import * as Tooltip from 'react-tooltip'
import { DatumContinuous, DatumVyz, isDatumVyz } from 'vyz-util'

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
   * * `Array<number>`
   */
  data: DatumContinuous[]
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Padding between elements */
  padding?: number
  /** Whether to add the fill color */
  fill?: boolean
  /** Whether to add the stroke color */
  stroke?: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: DatumVyz & number) => string
}

interface PolygonProps {
  datum: DatumContinuous
  dataLength: number
  padding: number
  index: number
  center: { x: number; y: number }
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumContinuous) => string
}

const getPolygonPoints = ({ index, value, center: { x, y }, padding, dataLength }): string => {
  const baseAngle = (Math.PI * 2) / dataLength
  const startAngle = Math.PI / 2 + index * baseAngle
  const middleAngle = startAngle + baseAngle / 2
  const endAngle = startAngle + baseAngle
  const complementarAngle = Math.PI - baseAngle / 2 - Math.PI / 2
  const longSide = value * (Math.sin(complementarAngle) + Math.cos(complementarAngle))

  const p0 = {
    x: x + padding * Math.cos(middleAngle),
    y: y + padding * Math.sin(middleAngle),
  }
  const p1 = {
    x: p0.x + value * Math.cos(startAngle),
    y: p0.y + value * Math.sin(startAngle),
  }
  const p2 = {
    x: p0.x + longSide * Math.cos(middleAngle),
    y: p0.y + longSide * Math.sin(middleAngle),
  }
  const p3 = {
    x: p0.x + value * Math.cos(endAngle),
    y: p0.y + value * Math.sin(endAngle),
  }

  const points = [p0, p1, p2, p3]
  return points.map(p => `${p.x},${p.y}`).join(' ')
}

const Polygon = ({
  datum,
  dataLength,
  index,
  center,
  padding,
  stroke,
  fill,
  tooltip,
}: PolygonProps) => {
  const color = isDatumVyz(datum) ? datum.z || DEFAULT_COLOR : DEFAULT_COLOR
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }
  const polygonPoints = getPolygonPoints({
    index,
    dataLength,
    value: isDatumVyz(datum) ? datum.y : datum,
    padding,
    center,
  })

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <polygon points={polygonPoints} style={style} />
    </g>
  )
}

export class Flower extends React.Component<Props> {
  static defaultProps = {
    stroke: false,
    fill: true,
    padding: 40,
  }

  render() {
    const {
      className,
      tooltip,
      data,
      width,
      height,
      stroke,
      fill,
      padding,
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
              padding={padding!}
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
