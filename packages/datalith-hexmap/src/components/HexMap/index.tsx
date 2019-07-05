import { GridMap, GridMapProps } from '@datalith/gridmap'
import * as React from 'react'

export type HexMapProps = Omit<GridMapProps, 'customRender'>
export class HexMap extends React.Component<HexMapProps> {
  static defaultProps = GridMap.defaultProps as Partial<GridMapProps>

  render() {
    return (
      <GridMap
        {...this.props}
        customRender={({ x, y, j, value }, props) => {
          const sqrt3 = Math.sqrt(3)
          // apply offset to x coordinate based on row index (j)
          x = j % 2 ? x : x + this.props.side / 2

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
              {...props}
            />
          )
        }}
      />
    )
  }
}
