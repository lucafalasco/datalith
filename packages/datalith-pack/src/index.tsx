import { callOrGetValue, Color, CommonProps, Datum, ResponsiveWrapper, Value } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import generatePack from './generatePack'

const DEFAULT_COLOR = '#000000'
interface Props extends CommonProps {
  /** Value Accessor */
  value: Value
  /** Color Accessor */
  color: Color

  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface Box {
  x: number
  y: number
  w: number
  h: number
}

interface BoxProps {
  datum: Datum
  color: Color
  box: Box
  index: number
  fill: boolean
  stroke: boolean
  tooltip?: (d: Datum) => string
}

const Box = ({ datum, box, index, fill, stroke, color: colorAccessor, tooltip }: BoxProps) => {
  const color = callOrGetValue(colorAccessor, datum, index)
  const style = {
    fill: fill ? color : 'transparent',
    stroke: stroke ? color : 'transparent',
  }

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <rect style={style} x={box.x} y={box.y} width={box.w} height={box.h} />
    </g>
  )
}

export const Pack = ResponsiveWrapper(
  class Pack extends React.Component<Props> {
    static defaultProps = {
      value: d => d,
      color: DEFAULT_COLOR,
    }

    render() {
      const {
        className,
        style,
        data,
        value,
        color,
        fill,
        stroke,
        size: { width, height },
        tooltip,
        center = {
          x: width / 2,
          y: height / 2,
        },
      } = this.props

      const boxes = data.map((datum, i) => {
        const sideLength = callOrGetValue(value, datum, i)
        return { w: sideLength, h: sideLength, i }
      })
      const pack = generatePack(boxes)

      return (
        <>
          <svg className={className} style={style}>
            <g
              transform={`translate(
              ${center.x - pack.boundingBox.w / 2},
              ${center.y - pack.boundingBox.h / 2}
            )`}
            >
              {pack.packBoxes.map((box, i) => {
                return (
                  <Box
                    key={i}
                    index={i}
                    datum={data[box.i]}
                    color={color}
                    box={box}
                    fill={fill}
                    stroke={stroke}
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
