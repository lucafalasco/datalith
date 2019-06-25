import { callOrGetValue, Color, Datum, Value } from '@datalith/util'
import * as React from 'react'
import Tooltip from 'react-tooltip'
import generatePack from './generatePack'

const DEFAULT_COLOR = '#000000'
interface Props {
  /** Custom css classes to pass to the SVG element */
  className?: string
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
  /** Whether to add the fill color */
  fill: boolean
  /** Whether to add the stroke color */
  stroke: boolean
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: Datum) => string
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

export class Pack extends React.Component<Props> {
  static defaultProps = {
    value: d => d,
    color: DEFAULT_COLOR,
    fill: true,
    stroke: false,
  }

  render() {
    const {
      className,
      data,
      value,
      color,
      width,
      height,
      fill,
      stroke,
      tooltip,
      center = {
        x: this.props.width / 2,
        y: this.props.height / 2,
      },
    } = this.props

    const boxes = data.map((datum, i) => {
      const sideLength = callOrGetValue(value, datum, i)
      return { w: sideLength, h: sideLength, i }
    })
    const pack = generatePack(boxes)

    return (
      <>
        <svg className={className} width={width} height={height}>
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
}
