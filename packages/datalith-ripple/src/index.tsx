import { callOrGetValue, Color, CommonProps, Datum, ResponsiveWrapper, Value } from '@datalith/util'
import { normalize } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

const DEFAULT_COLOR = 'hsl(0, 0%, 0%)'
interface Props extends CommonProps {
  /** Value Accessor */
  value: Value
  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface Center {
  x: number
  y: number
}

interface CircleProps {
  datum: Datum
  value: Value
  dataLength: number
  index: number
  center: Center
  fill: Color
  stroke: Color
  tooltip?: (d: Datum) => string
}

const Circle = ({
  datum,
  value: valueAccessor,
  dataLength,
  index,
  center,
  fill,
  stroke,
  tooltip,
}: CircleProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    fillOpacity:
      callOrGetValue(fill, datum, index) === DEFAULT_COLOR
        ? normalize(index, 0, dataLength)
        : undefined,
  }

  const radius = callOrGetValue(valueAccessor, datum, index)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <circle style={style} cx={center.x} cy={center.y} r={radius} />
    </g>
  )
}

export const Ripple: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
  class Ripple extends React.Component<Props> {
    static defaultProps = {
      value: d => d,
      fill: DEFAULT_COLOR,
    }

    render() {
      const {
        className,
        style,
        additionalElements,
        data,
        value,
        fill,
        stroke,
        tooltip,
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
            {data
              .sort((a, b) => callOrGetValue(value, b) - callOrGetValue(value, a, 0))
              .map((datum, i) => (
                <Circle
                  key={i}
                  index={i}
                  datum={datum}
                  value={value}
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
  },
)
