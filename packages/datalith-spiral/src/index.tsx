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
  coords: { x: number; y: number }
  index: number
  fill: Color
  stroke: Color
  tooltip?: (d: Datum) => string
}

function getSpiralCoords(data: Datum[], maxSide: number) {
  let angle = 0
  return data.map((d, i) => {
    const radius = Math.sqrt(i + 1)
    angle += Math.asin(1 / radius)
    return {
      x: radius * maxSide * Math.cos(angle),
      y: radius * maxSide * Math.sin(angle),
    }
  })
}

const Circle = ({
  datum,
  value: valueAccessor,
  index,
  coords,
  fill,
  stroke,
  tooltip,
}: CircleProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
  }

  const radius = callOrGetValue(valueAccessor, datum, index)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <circle style={style} cx={coords.x} cy={coords.y} r={radius} />
    </g>
  )
}

export const Spiral: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
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
      const coords = getSpiralCoords(data, maxRadius * 2)

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
                  coords={coords[i]}
                  value={value}
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
