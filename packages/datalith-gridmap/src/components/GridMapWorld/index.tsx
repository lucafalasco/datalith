import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import world from '../../json/world.json'
import { GridMap, GridMapProps } from '../GridMap'

export const worldTopology = world as WorldAtlas
const worldAtlas = feature(worldTopology, worldTopology.objects.countries)

type GridMapWorldProps = Omit<GridMapProps, 'featureCollection'>

export class GridMapWorld extends React.Component<GridMapWorldProps> {
  static defaultProps = GridMap.defaultProps as Partial<GridMapWorldProps>

  render() {
    return <GridMap {...this.props} featureCollection={worldAtlas} />
  }
}
