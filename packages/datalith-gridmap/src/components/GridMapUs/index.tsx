import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature, UsAtlas } from 'topojson'
import us from '../../json/us.json'
import { GridMap, GridMapProps } from '../GridMap'

export const usTopology = us as UsAtlas
const usAtlas = feature(usTopology, usTopology.objects.counties)

type GridMapUsProps = Omit<GridMapProps, 'featureCollection'>

export class GridMapUs extends React.Component<GridMapUsProps> {
  static defaultProps = GridMap.defaultProps

  render() {
    return <GridMap {...this.props} featureCollection={usAtlas} projection={geoAlbersUsa()} />
  }
}
