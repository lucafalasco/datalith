import * as React from 'react'
import * as Tooltip from 'react-tooltip'
import { DatumContinuous, DatumVyz, isDatumVyz } from 'vyz-util'

const DEFAULT_COLOR = '#000000'
interface Props {
  /** Custom css classes to pass to the SVG element */
  className?: string
  /** Width of the SVG */
  width: number
  /** Height of the SVG */
  height: number
  /**
   * Data can be one of:
   * * `Array<{ v?: any, y?: number, z?: string }>`
   * * `Array<number>`
   */
  data: DatumContinuous[]
  /** Center of the dataviz */
  center?: { x: number; y: number }
  /** Whether to add the fill color */
  fill?: boolean
  /** Whether to add the stroke color */
  stroke?: boolean
  /** Return HTML or text as a string to show on element mouseover */
  tooltip?: (d: DatumVyz & number) => string
}

// const Circle = ({ datum, dataLength, index, center, maxY, stroke, fill, tooltip }) => {
//   const color = isDatumVyz(datum) ? datum.z || DEFAULT_COLOR : DEFAULT_COLOR
//   const style = {
//     fill: fill ? color : 'transparent',
//     stroke: stroke ? color : 'transparent',
//   }

//   const radius = isDatumVyz(datum) ? datum.y || DEFAULT_RADIUS_LENGTH : datum

//   return (
//     <g data-tip={tooltip && tooltip(datum)}>
//       <circle style={style} cx={center.x} cy={center.y + (maxY - radius)} r={radius} />
//     </g>
//   )
// }

export class DotMap extends React.Component<Props> {
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

    return (
      <>
        <svg className={className} width={width} height={height}>
          {data.map((datum, i) => (
            // <Circle
            //   key={i}
            //   index={i}
            //   maxY={maxY}
            //   datum={datum}
            //   dataLength={data.length}
            //   fill={fill}
            //   stroke={stroke}
            //   center={center}
            //   tooltip={tooltip}
            // />
            <g key={i} />
          ))}
        </svg>
        <Tooltip html />
      </>
    )
  }
}
