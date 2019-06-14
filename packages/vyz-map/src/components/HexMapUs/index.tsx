import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature, UsAtlas } from 'topojson'
import usTopology from '../../json/us.json'
import { HexMap, HexMapProps } from '../HexMap'

const usAtlas = usTopology as any
const us = feature(usAtlas, (usAtlas as UsAtlas).objects.counties)

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
