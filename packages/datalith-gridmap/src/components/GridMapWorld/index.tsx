import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import world from '../../json/world.json'
import { GridMap, GridMapProps } from '../GridMap'

export const worldTopology = world as WorldAtlas
const worldAtlas = feature(worldTopology, worldTopology.objects.countries)

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
        featureCollection={worldAtlas}
        projection={projection}
        stroke={stroke}
        fill={fill}
        customRender={customRender}
        tooltip={tooltip}
      />
    )
  }
}
