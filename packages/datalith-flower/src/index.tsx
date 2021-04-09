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

interface Props extends CommonProps {
  /** Value Accessor */
  value: NumberAccessor
  /** Padding between elements */
  padding: number
  /** Center of the dataviz */
  center?: { x: number; y: number }
}

interface PolygonProps extends CommonAccessors {
  datum: Datum
  value: NumberAccessor
  index: number
  dataLength: number
  padding: number
  center: { x: number; y: number }
  tooltip?: (d: Datum) => string
}

const getShapePoints = ({ index, value, center: { x, y }, padding, dataLength }): string => {
  const baseAngle = (Math.PI * 2) / dataLength
  const startAngle = Math.PI / 2 + index * baseAngle
  const middleAngle = startAngle + baseAngle / 2
  const endAngle = startAngle + baseAngle
  const complementarAngle = Math.PI - baseAngle / 2 - Math.PI / 2
  const side = value * (Math.sin(complementarAngle) + Math.cos(complementarAngle))

  const p0 = {
    x: x + padding * Math.cos(middleAngle),
    y: y + padding * Math.sin(middleAngle),
  }
  const p1 = {
    x: p0.x + value * Math.cos(startAngle),
    y: p0.y + value * Math.sin(startAngle),
  }
  const p3 = {
    x: p0.x + value * Math.cos(endAngle),
    y: p0.y + value * Math.sin(endAngle),
  }

  const CP = {
    x1: p0.x + side * Math.cos(startAngle),
    y1: p0.y + side * Math.sin(startAngle),
    x2: p0.x + side * Math.cos(endAngle),
    y2: p0.y + side * Math.sin(endAngle),
  }

  return `M ${[p0, p1].map(p => `${p.x} ${p.y}`).join(' L ')} 
    C ${CP.x1} ${CP.y1} ${CP.x2} ${CP.y2} ${p3.x} ${p3.y} Z`
}

const Polygon = ({
  datum,
  value: valueAccessor,
  dataLength,
  index,
  center,
  padding,
  fill,
  fillOpacity,
  stroke,
  strokeOpacity,
  tooltip,
}: PolygonProps) => {
  const style = {
    fill: callOrGetValue(fill, datum, index),
    fillOpacity: callOrGetValue(fillOpacity, datum, index),
    stroke: callOrGetValue(stroke, datum, index),
    strokeOpacity: callOrGetValue(strokeOpacity, datum, index),
  }
  const points = getShapePoints({
    index,
    dataLength,
    value: callOrGetValue(valueAccessor, datum, index),
    padding,
    center,
  })

  return (
    <g data-tip={tooltip && tooltip(datum)}>
      <path d={points} style={style} />
    </g>
  )
}

export class FlowerComponent extends React.Component<Props> {
  static defaultProps = {
    value: d => d,
    padding: 20,
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
      padding,
      tooltip,
      size: { width, height },
      center = {
        x: width / 2,
        y: height / 2,
      },
    } = this.props

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
          {data.map((datum, i) => (
            <Polygon
              key={i}
              index={i}
              center={center}
              datum={datum}
              value={value}
              dataLength={data.length}
              padding={padding}
              fill={fill}
              fillOpacity={fillOpacity}
              stroke={stroke}
              strokeOpacity={strokeOpacity}
              tooltip={tooltip}
            />
          ))}
        </svg>
        <Tooltip html />
      </>
    )
  }
}

export const Flower: React.ComponentType<Partial<Props>> = ResponsiveWrapper(FlowerComponent)
