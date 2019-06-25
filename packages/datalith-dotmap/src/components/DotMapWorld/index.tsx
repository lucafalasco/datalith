import { worldTopology } from '@datalith/gridmap'
import * as React from 'react'
import { feature } from 'topojson'
import { DotMap, DotMapProps } from '../DotMap'

const world = feature(worldTopology, worldTopology.objects.countries)

type DotMapWorldProps = Omit<DotMapProps, 'featureCollection'>

export class DotMapWorld extends React.Component<DotMapWorldProps> {
  static defaultProps = DotMap.defaultProps

  render() {
    return <DotMap {...this.props} featureCollection={world} />
  }
}
