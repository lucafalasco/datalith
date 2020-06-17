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
  /** Spacing between points */
  spacing?: number
  /**
   * Optional function to compute data points position
   * @param dataLength length of data points
   * @param size container dimensions, defined as an object {width, height}
   * @return Array of xy coordinates starting from center origin <width/2, height/2>, defined as an object {x, y}
   **/
  getSpiralCoords?: (
    dataLength: number,
    size: { width: number; height: number },
  ) => Array<{ x: number; y: number }>
}

interface CircleProps extends CommonAccessors {
  datum: Datum
  value: NumberAccessor
  x: number
  y: number
  index: number
  tooltip?: (d: Datum) => string
}

function getDefaultSpiralCoords(dataLength: number, spacing: number) {
  let angle = 0
  const coords: Array<{ x: number; y: number }> = []

  for (let i = 0; i < dataLength; i++) {
    const radius = Math.pow(angle, 2)

    // using quadratic formula as suggested here: https://stackoverflow.com/questions/13894715/draw-equidistant-points-on-a-spiral
    const delta = (-2 * radius + Math.sqrt(4 * radius * radius + 20 * spacing)) / 4

    coords.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    })

    angle += delta
  }

  return coords
}

const Circle = ({
  datum,
  value: valueAccessor,
  index,
  x,
  y,
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
      <circle style={style} cx={x} cy={y} r={radius} />
    </g>
  )
}

export const Spiral: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
  class Spiral extends React.Component<Props> {
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
        getSpiralCoords,
        size: { width, height },
        center = {
          x: width / 2,
          y: height / 2,
        },
      } = this.props

      const { spacing = Math.min(Math.min(width, height), 2000) * 0.015 } = this.props
      const coords = getSpiralCoords
        ? getSpiralCoords(data.length, { width, height })
        : getDefaultSpiralCoords(data.length, spacing)

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
                  x={coords[i].x}
                  y={coords[i].y}
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
