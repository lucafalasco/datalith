import * as React from 'react'
import * as Tooltip from 'react-tooltip'
import generatePack from './generatePack'

const DEFAULT_COLOR = '#000000'
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
  data: Datum[]
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
  tooltip?: (d: Datum) => string
}

interface Datum {
  v?: any
  y: number
  z?: string
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

    const boxes = data.map((d, i) => ({ w: d.y, h: d.y, i }))
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
              const style = {
                fill: fill ? data[box.i].z || DEFAULT_COLOR : 'transparent',
                stroke: stroke ? data[box.i].z || DEFAULT_COLOR : 'transparent',
              }

              return (
                <rect
                  key={i}
                  style={style}
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  data-tip={tooltip && tooltip(data[box.i])}
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
