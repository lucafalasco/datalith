import { geoAlbersUsa } from 'd3-geo'
import * as React from 'react'
import { feature, UsAtlas } from 'topojson'
import us from '../../json/us.json'
import { GridMap, GridMapProps } from '../GridMap'

export const usTopology = us as UsAtlas
const usAtlas = feature(usTopology, usTopology.objects.counties)

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
        featureCollection={usAtlas}
        projection={projection}
        stroke={stroke}
        fill={fill}
        customRender={customRender}
        tooltip={tooltip}
      />
    )
  }
}
