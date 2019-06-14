import { GridMap, GridMapProps } from '@datalith/gridmap'
import * as React from 'react'

export type PixelMapProps = Omit<GridMapProps, 'customRender'>
export class PixelMap extends React.Component<PixelMapProps> {
  render() {
    const {
      className,
      tooltip,
      data,
      featureCollection,
      projection,
      width,
      side,
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
        customRender={({ x, y, value }, defaultProps) => (
          <rect
            x={x - value / 2}
            y={y - value / 2}
            width={value}
            height={value}
            {...defaultProps}
          />
        )}
      />
    )
  }
}
