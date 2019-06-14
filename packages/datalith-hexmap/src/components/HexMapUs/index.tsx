import { usTopology } from '@datalith/gridmap'
import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature } from 'topojson'
import { HexMap, HexMapProps } from '../HexMap'

const us = feature(usTopology, usTopology.objects.counties)

type HexMapUsProps = Omit<HexMapProps, 'featureCollection'>

export class HexMapUs extends React.Component<HexMapUsProps> {
  render() {
    const {
      className,
      tooltip,
      data,
      projection = geoAlbersUsa(),
      width,
      side,
      height,
      stroke,
      fill,
    } = this.props

    return (
      <HexMap
        className={className}
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={us}
        projection={projection}
        stroke={stroke}
        fill={fill}
        tooltip={tooltip}
      />
    )
  }
}
