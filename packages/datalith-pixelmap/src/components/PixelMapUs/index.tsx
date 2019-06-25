import { usTopology } from '@datalith/gridmap'
import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature } from 'topojson'
import { PixelMap, PixelMapProps } from '../PixelMap'

const us = feature(usTopology, usTopology.objects.counties)

type PixelMapUsProps = Omit<PixelMapProps, 'featureCollection'>

export class PixelMapUs extends React.Component<PixelMapUsProps> {
  static defaultProps = PixelMap.defaultProps

  render() {
    return <PixelMap {...this.props} projection={geoAlbersUsa()} featureCollection={us} />
  }
}
