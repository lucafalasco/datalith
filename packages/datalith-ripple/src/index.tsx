import * as React from 'react'
import Tooltip from 'react-tooltip'
import { DatumContinuous, Datumdatalith, isDatumdatalith } from '@datalith/util'
import normalize from './normalize'

const DEFAULT_COLOR = '#000000'
const DEFAULT_RADIUS_LENGTH = 10
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
  /** Whether to add the fill color */
  fill?: boolean
  /** Whether to add the stroke color */
  stroke?: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: Datumdatalith & number) => string
}

interface Center {
  x: number
  y: number
}

interface CircleProps {
  datum: DatumContinuous
  dataLength: number
  index: number
  center: Center
  maxY: number
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumContinuous) => string
}

const Circle = ({ datum, dataLength, index, center, maxY, stroke, fill, tooltip }: CircleProps) => {
  const color = isDatumdatalith(datum) ? datum.z || DEFAULT_COLOR : DEFAULT_COLOR
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
    fillOpacity: normalize(index, 0, dataLength),
  }

  const radius = isDatumdatalith(datum) ? datum.y || DEFAULT_RADIUS_LENGTH : datum

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
      ...data.map(datum => (isDatumdatalith(datum) ? datum.y || DEFAULT_RADIUS_LENGTH : datum)),
    )

    return (
      <>
        <svg className={className} width={width} height={height}>
          {data
            .sort(
              (a, b) =>
                (isDatumdatalith(b) ? b.y || DEFAULT_RADIUS_LENGTH : b) -
                (isDatumdatalith(a) ? a.y || DEFAULT_RADIUS_LENGTH : a),
            )
            .map((datum, i) => (
              <Circle
                key={i}
                index={i}
                maxY={maxY}
                datum={datum}
                dataLength={data.length}
                fill={fill}
                stroke={stroke}
                center={center}
                tooltip={tooltip}
              />
            ))}
        </svg>
        <Tooltip html />
      </>
    )
  }
}
