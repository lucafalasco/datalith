import { callOrGetValue, Color, Datum, Value } from '@datalith/util'
import { normalize } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

const DEFAULT_COLOR = '#000000'
interface Props {
  /** Custom css classes to pass to the SVG element */
  className?: string
  /** Custom style object to apply to the SVG */
  style?: React.CSSProperties
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
  /** Add the fill color */
  fill: boolean
  /** Add the stroke color */
  stroke: boolean
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: Datum) => string
}

interface Center {
  x: number
  y: number
}

interface CircleProps {
  datum: Datum
  value: Value
  color: Color
  dataLength: number
  index: number
  center: Center
  fill: boolean
  stroke: boolean
  tooltip?: (d: Datum) => string
}

const Circle = ({
  datum,
  color: colorAccessor,
  value: valueAccessor,
  dataLength,
  index,
  center,
  fill,
  stroke,
  tooltip,
}: CircleProps) => {
  const color = callOrGetValue(colorAccessor, datum, index)

  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
    fillOpacity: color === DEFAULT_COLOR ? normalize(index, 0, dataLength) : undefined,
  }

  const radius = callOrGetValue(valueAccessor, datum, index)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <circle style={style} cx={center.x} cy={center.y} r={radius} />
    </g>
  )
}

export class Ripple extends React.Component<Props> {
  static defaultProps = {
    value: d => d,
    color: DEFAULT_COLOR,
    fill: true,
    stroke: false,
  }

  render() {
    const {
      className,
      style,
      tooltip,
      data,
      value,
      color,
      width,
      height,
      fill,
      stroke,
      center = {
        x: this.props.width / 2,
        y: this.props.height / 2,
      },
    } = this.props

    return (
      <>
        <svg className={className} style={style} width={width} height={height}>
          {data
            .sort((a, b) => callOrGetValue(value, b) - callOrGetValue(value, a, 0))
            .map((datum, i) => (
              <Circle
                key={i}
                index={i}
                datum={datum}
                value={value}
                color={color}
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
