import * as React from 'react'
import { GridMap, GridMapProps } from '../GridMap'

export type HexMapProps = Omit<GridMapProps, 'customRender'>
export class HexMap extends React.Component<HexMapProps> {
  render() {
    const {
      className,
      tooltip,
      data,
      featureCollection,
      projection,
      width,
      side = 5,
      height,
      stroke,
      fill,
    } = this.props

    return (
      <GridMap
        className={className}
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={featureCollection}
        projection={projection}
        stroke={stroke}
        fill={fill}
        tooltip={tooltip}
        customRender={({ x, y, j, value }, defaultProps) => {
          const sqrt3 = Math.sqrt(3)
          // apply offset to x coordinate based on row index (j)
          x = j % 2 ? x : x + side / 2

          return (
            <polygon
              strokeWidth={value * 0.5}
              points={`
                ${x - (sqrt3 * value) / 2} ${y + value / 2}
                ${x - (sqrt3 * value) / 2} ${y - value / 2}
                ${x} ${y - value}
                ${x + (sqrt3 * value) / 2} ${y - value / 2}
                ${x + (sqrt3 * value) / 2} ${y + value / 2}
                ${x} ${y + value}
              `}
              {...defaultProps}
            />
          )
        }}
      />
    )
  }
}
