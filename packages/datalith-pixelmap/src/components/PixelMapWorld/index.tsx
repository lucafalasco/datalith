import { worldTopology } from '@datalith/gridmap'
import * as React from 'react'
import { feature } from 'topojson'
import { PixelMap, PixelMapProps } from '../PixelMap'

const world = feature(worldTopology, worldTopology.objects.countries)

type PixelMapWorldProps = Omit<PixelMapProps, 'featureCollection'>

export class PixelMapWorld extends React.Component<PixelMapWorldProps> {
  static defaultProps = PixelMap.defaultProps

  render() {
    return <PixelMap {...this.props} featureCollection={world} />
  }
}
