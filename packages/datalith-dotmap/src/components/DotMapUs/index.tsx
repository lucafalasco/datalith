import { usTopology } from '@datalith/gridmap'
import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature } from 'topojson'
import { DotMap, DotMapProps } from '../DotMap'

const us = feature(usTopology, usTopology.objects.counties)

type DotMapUsProps = Omit<DotMapProps, 'featureCollection'>

export class DotMapUs extends React.Component<DotMapUsProps> {
  static defaultProps = DotMap.defaultProps

  render() {
    return <DotMap {...this.props} projection={geoAlbersUsa()} featureCollection={us} />
  }
}
