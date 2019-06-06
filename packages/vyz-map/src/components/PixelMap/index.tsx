import { geoEqualEarth } from 'd3-geo'
import * as React from 'react'
import { GridMap, GridMapProps } from '../GridMap'

export class PixelMap extends React.Component<GridMapProps> {
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
