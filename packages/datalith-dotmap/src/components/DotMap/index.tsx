import { GridMap, GridMapProps } from '@datalith/gridmap'
import * as React from 'react'

export type DotMapProps = Omit<GridMapProps, 'customRender'>
export class DotMap extends React.Component<DotMapProps> {
  static defaultProps = GridMap.defaultProps

  render() {
    return (
      <GridMap
        {...this.props}
        customRender={({ x, y, value }, defaultProps) => (
          <circle cx={x} cy={y} r={value} {...defaultProps} />
        )}
      />
    )
  }
}
