import { usTopology } from '@datalith/gridmap'
import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature } from 'topojson'
import { PixelMap, PixelMapProps } from '../PixelMap'

const us = feature(usTopology, usTopology.objects.counties)

type PixelMapUsProps = Omit<PixelMapProps, 'featureCollection'>

export class PixelMapUs extends React.Component<PixelMapUsProps> {
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
      <PixelMap
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
