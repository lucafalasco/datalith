import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import worldTopology from '../../json/world.json'
import { PixelMap, PixelMapProps } from '../PixelMap'

const world = feature(worldTopology as WorldAtlas, (worldTopology as WorldAtlas).objects.countries)

type PixelMapWorldProps = Omit<PixelMapProps, 'featureCollection'>

export class PixelMapWorld extends React.Component<PixelMapWorldProps> {
  render() {
    const { className, tooltip, data, projection, width, side, height, stroke, fill } = this.props

    return (
      <PixelMap
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
