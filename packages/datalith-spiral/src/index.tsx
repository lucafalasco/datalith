import { callOrGetValue, Color, CommonProps, Datum, ResponsiveWrapper, Value } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

const DEFAULT_COLOR = 'hsl(0, 0%, 0%)'
interface Props extends CommonProps {
  /** Value Accessor */
  value: Value
  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface CircleProps {
  datum: Datum
  value: Value
  dataLength: number
  maxRadius: number
  index: number
  fill: Color
  stroke: Color
  tooltip?: (d: Datum) => string
}

function getSpiralCoords(index: number, total: number, maxSide: number) {
  // const a = total / maxSide
  // const angle = (Math.PI / a) * Math.sqrt(index) * a
  // return {
  //   x: a * angle * Math.cos(angle),
  //   y: a * angle * Math.sin(angle),
  // }
  const d = maxSide
  const radius = Math.sqrt(index + 1)
  const angle = Math.asin(1 / radius) * index
  return {
    x: radius * d * Math.cos(angle),
    y: radius * d * Math.sin(angle),
  }
}

const Circle = ({
  datum,
  value: valueAccessor,
  dataLength,
  maxRadius,
  index,
  fill,
  stroke,
  tooltip,
}: CircleProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    fillOpacity: callOrGetValue(fill, datum, index) === DEFAULT_COLOR ? 0.7 : undefined,
  }

  const radius = callOrGetValue(valueAccessor, datum, index)
  const coords = getSpiralCoords(index, dataLength, maxRadius * 2)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <circle style={style} cx={coords.x} cy={coords.y} r={radius} />
    </g>
  )
}

export const Spiral = ResponsiveWrapper(
  class Spiral extends React.Component<Props> {
    static defaultProps = {
      value: d => d,
      fill: DEFAULT_COLOR,
    }

    render() {
      const {
        className,
        style,
        defs,
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

      const maxRadius = Math.max(...data.map((d, i) => callOrGetValue(value, d, i)))

      return (
        <>
          <svg className={className} style={style}>
            {defs}
            <g transform={`translate(${center.x}, ${center.y})`}>
              {data.map((datum, i) => (
                <Circle
                  key={i}
                  index={i}
                  datum={datum}
                  value={value}
                  dataLength={data.length}
                  maxRadius={maxRadius}
                  fill={fill}
                  stroke={stroke}
                  tooltip={tooltip}
                />
              ))}
            </g>
          </svg>
          <Tooltip html />
        </>
      )
    }
  },
)
