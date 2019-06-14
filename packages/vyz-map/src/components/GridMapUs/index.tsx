import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature, UsAtlas } from 'topojson'
import usTopology from '../../json/us.json'
import { GridMap, GridMapProps } from '../GridMap'

const usAtlas = usTopology as any
const us = feature(usAtlas, (usAtlas as UsAtlas).objects.counties)

type GridMapUsProps = Omit<GridMapProps, 'featureCollection'>

export class GridMapUs extends React.Component<GridMapUsProps> {
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
      customRender,
    } = this.props

    return (
      <GridMap
        className={className}
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={us}
        projection={projection}
        stroke={stroke}
        fill={fill}
        customRender={customRender}
        tooltip={tooltip}
      />
    )
  }
}
