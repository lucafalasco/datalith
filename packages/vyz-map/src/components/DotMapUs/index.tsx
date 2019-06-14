import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature, UsAtlas } from 'topojson'
import usTopology from '../../json/us.json'
import { DotMap, DotMapProps } from '../DotMap'

const usAtlas = usTopology as any
const us = feature(usAtlas, (usAtlas as UsAtlas).objects.counties)

type DotMapUsProps = Omit<DotMapProps, 'featureCollection'>

export class DotMapUs extends React.Component<DotMapUsProps> {
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
      <DotMap
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
