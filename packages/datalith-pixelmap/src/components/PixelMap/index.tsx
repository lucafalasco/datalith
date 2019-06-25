import { GridMap, GridMapProps } from '@datalith/gridmap'
import * as React from 'react'

export type PixelMapProps = Omit<GridMapProps, 'customRender'>
export class PixelMap extends React.Component<PixelMapProps> {
  static defaultProps = GridMap.defaultProps

  render() {
    return (
      <GridMap
        {...this.props}
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
