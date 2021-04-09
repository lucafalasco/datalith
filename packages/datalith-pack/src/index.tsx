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
import generatePack from './generatePack'

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface Box {
  x: number
  y: number
  w: number
  h: number
}

interface BoxProps extends CommonAccessors {
  datum: Datum
  box: Box
  index: number
  tooltip?: (d: Datum) => string
}

const Box = ({
  datum,
  box,
  index,
  fill,
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
}: BoxProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    fillOpacity: callOrGetValue(fillOpacity, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    strokeOpacity: callOrGetValue(strokeOpacity, datum, index),
  }

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <rect style={style} x={box.x} y={box.y} width={box.w} height={box.h} />
    </g>
  )
}

export class PackComponent extends React.Component<Props> {
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

    const boxes = data.map((datum, i) => {
      const sideLength = callOrGetValue(value, datum, i)
      return { w: sideLength, h: sideLength, i }
    })
    const pack = generatePack(boxes)

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
                  box={box}
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
}

export const Pack: React.ComponentType<Partial<Props>> = ResponsiveWrapper(PackComponent)
