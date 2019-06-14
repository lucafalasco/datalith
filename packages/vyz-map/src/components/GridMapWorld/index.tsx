import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import worldTopology from '../../json/world.json'
import { GridMap, GridMapProps } from '../GridMap'

const world = feature(worldTopology as WorldAtlas, (worldTopology as WorldAtlas).objects.countries)

type GridMapWorldProps = Omit<GridMapProps, 'featureCollection'>

export class GridMapWorld extends React.Component<GridMapWorldProps> {
  render() {
    const {
      className,
      tooltip,
      data,
      projection,
      width,
      side,
      height,
      stroke,
      fill,
      customRender,
    } = this.props

    return (
      <GridMap
        className={className}
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
        projection={projection}
        stroke={stroke}
        fill={fill}
        customRender={customRender}
        tooltip={tooltip}
      />
    )
  }
}
