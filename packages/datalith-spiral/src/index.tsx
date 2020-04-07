import {
  callOrGetValue,
  CommonProps,
  Datum,
  ResponsiveWrapper,
  NumberAccessor,
  CommonAccessors,
} from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Spacing between points on spiral */
  spacing: number
}

interface CircleProps extends CommonAccessors {
  datum: Datum
  value: NumberAccessor
  coords: { x: number; y: number }
  index: number
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
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
}: CircleProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    fillOpacity: !fill && !fillOpacity ? 0.8 : callOrGetValue(fillOpacity, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    strokeOpacity: callOrGetValue(strokeOpacity, datum, index),
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
        fillOpacity,
        stroke,
        strokeOpacity,
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
                  fillOpacity={fillOpacity}
                  stroke={stroke}
                  strokeOpacity={strokeOpacity}
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
