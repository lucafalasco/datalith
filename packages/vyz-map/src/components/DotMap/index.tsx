import * as React from 'react'
import { GridMap, GridMapProps } from '../GridMap'

export type DotMapProps = Omit<GridMapProps, 'customRender'>
export class DotMap extends React.Component<DotMapProps> {
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
          <circle cx={x} cy={y} r={value} {...defaultProps} />
        )}
      />
    )
  }
}
