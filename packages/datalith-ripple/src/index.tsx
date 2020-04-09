import {
  callOrGetValue,
  CommonProps,
  Datum,
  ResponsiveWrapper,
  NumberAccessor,
  CommonAccessors,
} from '@datalith/util'
import { normalize } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface Center {
  x: number
  y: number
}

interface CircleProps extends CommonAccessors {
  datum: Datum
  value: NumberAccessor
  dataLength: number
  index: number
  center: Center
  tooltip?: (d: Datum) => string
}

const Circle = ({
  datum,
  value: valueAccessor,
  dataLength,
  index,
  center,
  fill,
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
}: CircleProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    fillOpacity:
      !fill && !fillOpacity
        ? normalize(index, 0, dataLength)
        : callOrGetValue(fillOpacity, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    strokeOpacity: callOrGetValue(strokeOpacity, datum, index),
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
    }

    render() {
      const {
        className,
        style,
        additionalElements,
        data,
        value,
        fill,
        fillOpacity,
        stroke,
        strokeOpacity,
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
                  fillOpacity={fillOpacity}
                  stroke={stroke}
                  strokeOpacity={strokeOpacity}
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
