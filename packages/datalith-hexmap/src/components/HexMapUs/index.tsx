import { usTopology } from '@datalith/gridmap'
import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature } from 'topojson'
import { HexMap, HexMapProps } from '../HexMap'

const us = feature(usTopology, usTopology.objects.counties)

type HexMapUsProps = Omit<HexMapProps, 'featureCollection'>

export class HexMapUs extends React.Component<HexMapUsProps> {
  static defaultProps = HexMap.defaultProps

  render() {
    return <HexMap {...this.props} projection={geoAlbersUsa()} featureCollection={us} />
  }
}
