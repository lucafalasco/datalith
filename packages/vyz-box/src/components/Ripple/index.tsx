import * as React from 'react'
import * as Tooltip from 'react-tooltip'
import normalize from './normalize'

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

export class Ripple extends React.Component<Props> {
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

    const maxY = Math.max(...data.map(d => d.y))

    return (
      <>
        <svg className={className} width={width} height={height}>
          {data
            .sort((a, b) => b.y - a.y)
            .map((datum, i) => {
              const style = {
                fill: fill ? datum.z || DEFAULT_COLOR : 'transparent',
                stroke: stroke ? datum.z || DEFAULT_COLOR : 'transparent',
                fillOpacity: normalize(i, 0, data.length),
              }

              return (
                <circle
                  key={i}
                  style={style}
                  cx={center.x}
                  cy={center.y + (maxY - datum.y)}
                  r={datum.y}
                  data-tip={tooltip && tooltip(datum)}
                />
              )
            })}
        </svg>
        <Tooltip html />
      </>
    )
  }
}
