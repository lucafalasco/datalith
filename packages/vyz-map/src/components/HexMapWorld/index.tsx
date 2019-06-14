import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import worldTopology from '../../json/world.json'
import { HexMap, HexMapProps } from '../HexMap'

const world = feature(worldTopology as WorldAtlas, (worldTopology as WorldAtlas).objects.countries)

type HexMapWorldProps = Omit<HexMapProps, 'featureCollection'>

export class HexMapWorld extends React.Component<HexMapWorldProps> {
  render() {
    const { className, tooltip, data, projection, width, side, height, stroke, fill } = this.props

    return (
      <HexMap
        className={className}
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
        projection={projection}
        stroke={stroke}
        fill={fill}
        tooltip={tooltip}
      />
    )
  }
}
