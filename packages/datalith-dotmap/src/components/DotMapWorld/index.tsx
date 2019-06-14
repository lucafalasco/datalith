import { worldTopology } from '@datalith/gridmap'
import * as React from 'react'
import { feature } from 'topojson'
import { DotMap, DotMapProps } from '../DotMap'

const world = feature(worldTopology, worldTopology.objects.countries)

type DotMapWorldProps = Omit<DotMapProps, 'featureCollection'>

export class DotMapWorld extends React.Component<DotMapWorldProps> {
  render() {
    const { className, tooltip, data, projection, width, side, height, stroke, fill } = this.props

    return (
      <DotMap
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
