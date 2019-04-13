import * as React from 'react'
import * as Tooltip from 'react-tooltip'
import { DatumContinuous, DatumVyz, isDatumVyz } from 'vyz-util'

const DEFAULT_COLOR = '#000000'
const DEFAULT_RADIUS_LENGTH = 10
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
   * {v: any, y: number, y2?: number, z?: string, z2?: string}
   */
  data: DatumContinuous[]
  /**
   * Center of the visualization
   */
  center?: { x: number; y: number }
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
  tooltip?: (d: DatumVyz & number) => string
}

interface Center {
  x: number
  y: number
}

interface CircleProps {
  datum: DatumContinuous
  center: Center
  maxY: number
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumContinuous) => string
}

const Circle = ({ datum, center, maxY, stroke, fill, tooltip }: CircleProps) => {
  const color = isDatumVyz(datum) ? datum.z || DEFAULT_COLOR : DEFAULT_COLOR
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }

  const radius = isDatumVyz(datum) ? datum.y || DEFAULT_RADIUS_LENGTH : datum

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <circle style={style} cx={center.x} cy={center.y + (maxY - radius)} r={radius} />
    </g>
  )
}

export class Ripple extends React.Component<Props> {
  static defaultProps = {
    stroke: false,
    fill: true,
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
      center = {
        x: this.props.width / 2,
        y: this.props.height / 2,
      },
    } = this.props

    const maxY = Math.max(
      ...data.map(datum => (isDatumVyz(datum) ? datum.y || DEFAULT_RADIUS_LENGTH : datum)),
    )

    return (
      <>
        <svg className={className} width={width} height={height}>
          {data
            .sort(
              (a, b) =>
                (isDatumVyz(b) ? b.y || DEFAULT_RADIUS_LENGTH : b) -
                (isDatumVyz(a) ? a.y || DEFAULT_RADIUS_LENGTH : a),
            )
            .map((datum, i) => (
              <Circle
                key={i}
                maxY={maxY}
                datum={datum}
                fill={fill}
                stroke={stroke}
                center={center}
              />
            ))}
        </svg>
        <Tooltip html />
      </>
    )
  }
}
