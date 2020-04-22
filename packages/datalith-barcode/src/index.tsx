import {
  callOrGetValue,
  CommonProps,
  Datum,
  ResponsiveWrapper,
  CommonAccessors,
  NumberAccessor,
} from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'

const DEFAULT_BAR_WIDTH = 10

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Width of the bars */
  barWidth: number
  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface BarProps extends CommonAccessors {
  datum: Datum
  value: NumberAccessor
  barCodeHeight: number
  barWidth: number
  index: number
  tooltip?: (d: Datum) => string
}

const Bar = ({
  datum,
  index,
  barCodeHeight,
  barWidth,
  value: valueAccessor,
  fill,
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
}: BarProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    fillOpacity: callOrGetValue(fillOpacity, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    strokeOpacity: callOrGetValue(strokeOpacity, datum, index),
  }

  const value = callOrGetValue(valueAccessor, datum, index)

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <rect
        style={style}
        x={barWidth * index}
        y={barCodeHeight / 2 - value / 2}
        width={barWidth}
        height={value}
      />
    </g>
  )
}

export const BarCode: React.ComponentType<Partial<Props>> = ResponsiveWrapper(
  class BarCode extends React.Component<Props> {
    static defaultProps = {
      value: d => d,
      barWidth: DEFAULT_BAR_WIDTH,
    }

    render() {
      const {
        className,
        style,
        additionalElements,
        data,
        barWidth,
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

      const barCodeWidth = barWidth * data.length
      const barCodeHeight = Math.max(...data.map((d, i) => callOrGetValue(value, d, i)))

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
            <g
              transform={`translate(
              ${center.x - barCodeWidth / 2},
              ${center.y - barCodeHeight / 2}
            )`}
            >
              {data.map((datum, i) => {
                return (
                  <Bar
                    key={i}
                    index={i}
                    datum={datum}
                    barWidth={barWidth}
                    barCodeHeight={barCodeHeight}
                    value={value}
                    fill={fill}
                    fillOpacity={fillOpacity}
                    stroke={stroke}
                    strokeOpacity={strokeOpacity}
                    tooltip={tooltip}
                  />
                )
              })}
            </g>
          </svg>
          <Tooltip html />
        </>
      )
    }
  },
)
