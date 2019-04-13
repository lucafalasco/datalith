import * as React from 'react'
import * as Tooltip from 'react-tooltip'
import { DatumContinuous, DatumVyz, isDatumVyz } from 'vyz-util'
import generatePack from './generatePack'

const DEFAULT_COLOR = '#000000'
const DEFAULT_SIDE_LENGTH = 10
interface Props {
  /**
   * Pass custom css classes to the SVG element
   */
  className?: string
  /**
   * Width of the SVG
   */
  width: number
  /**
   * Height of the SVG
   */
  height: number
  /**
   * Data must be defined as an array of objects defined like this:
   * {v: any, y: number, y2?: number, z?: string, z2?: string}
   */
  data: DatumContinuous[]
  /**
   * Center of the visualization
   */
  center?: { x: number; y: number }
  /**
   * Whether to add the fill color
   */
  fill?: boolean
  /**
   * Whether to add the stroke color
   */
  stroke?: boolean
  /**
   * An optional function that returns an HTML string to be display as the element is hovered
   */
  tooltip?: (d: DatumVyz & number) => string
}

interface Box {
  x: number
  y: number
  w: number
  h: number
}

interface BoxProps {
  datum: DatumContinuous
  box: Box
  stroke?: boolean
  fill?: boolean
  tooltip?: (d: DatumContinuous) => string
}

const Box = ({ datum, box, stroke, fill, tooltip }: BoxProps) => {
  const color = isDatumVyz(datum) ? datum.z || DEFAULT_COLOR : DEFAULT_COLOR
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
    stroke: false,
    fill: true,
  }

  render() {
    const {
      className,
      tooltip,
      data,
      width,
      height,
      stroke,
      fill,
      center = {
        x: this.props.width / 2,
        y: this.props.height / 2,
      },
    } = this.props

    const boxes = data.map((datum, i) => {
      const sideLength = isDatumVyz(datum) ? datum.y || DEFAULT_SIDE_LENGTH : datum
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
              return <Box key={i} datum={data[box.i]} box={box} fill={fill} stroke={stroke} />
            })}
          </g>
        </svg>
        <Tooltip html />
      </>
    )
  }
}
