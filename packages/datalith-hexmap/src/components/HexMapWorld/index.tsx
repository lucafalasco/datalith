import { worldTopology } from '@datalith/gridmap'
import * as React from 'react'
import { feature } from 'topojson'
import { HexMap, HexMapProps } from '../HexMap'

const world = feature(worldTopology, worldTopology.objects.countries)

type HexMapWorldProps = Omit<HexMapProps, 'featureCollection'>

export class HexMapWorld extends React.Component<HexMapWorldProps> {
  static defaultProps = HexMap.defaultProps

  render() {
    return <HexMap {...this.props} featureCollection={world} />
  }
}
