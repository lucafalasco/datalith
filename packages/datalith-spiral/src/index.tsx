import { callOrGetValue, Color, CommonProps, Datum, ResponsiveWrapper, Value } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

const DEFAULT_COLOR = 'hsl(0, 0%, 0%)'
interface Props extends CommonProps {
  /** Value Accessor */
  value: Value
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Spacing between points on spiral */
  spacing: number
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

function getSpiralCoords(data: Datum[], spacing: number) {
  let angle = 0

  return data.map(d => {
    const radius = Math.pow(angle, 2)
    // using quadratic formula as suggested here: https://stackoverflow.com/questions/13894715/draw-equidistant-points-on-a-spiral
    const delta = (-2 * radius + Math.sqrt(4 * radius * radius + 16 * spacing)) / 4

    const coords = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    }

    angle += delta

    return coords
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
    fillOpacity: callOrGetValue(fill, datum, index) === DEFAULT_COLOR ? 0.8 : undefined,
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
      spacing: 20,
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
        spacing,
        size: { width, height },
        center = {
          x: width / 2,
          y: height / 2,
        },
      } = this.props

      const maxRadius = Math.max(...data.map((d, i) => callOrGetValue(value, d, i)))
      const coords = getSpiralCoords(data, spacing)

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
