import italyTopology from '@datalith/gridmap/src/json/italy.json'
import { PixelMap } from '@datalith/pixelmap/src'
import notes from '@datalith/pixelmap/src/components/PixelMap/README.md'
import { storiesOf } from '@storybook/react'
import { geoNaturalEarth1 } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { feature } from 'topojson'
import { genCoordsValueIt } from '../scripts'

interface ItalyAtlas extends TopoJSON.Topology {
  objects: {
    sub: TopoJSON.GeometryCollection
  }
}

const italyAtlas = italyTopology as any

const defaultData = genCoordsValueIt(200)
const side = 10
const italy = feature(italyAtlas, (italyAtlas as ItalyAtlas).objects.sub)
const projection = geoNaturalEarth1()
const y = d => d.value

const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([1, side * 0.9])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

storiesOf('DATALITHS|PixelMap.PixelMap', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <PixelMap
        side={side}
        data={defaultData}
        featureCollection={italy}
        projection={projection}
        coords={d => [d.lng, d.lat]}
        value={side * 0.9}
        valueInactive={side * 0.9}
        fill="#2D886D"
        fillInactive="#ccc"
        fillOpacity={d => zScale(d.value)}
        fillOpacityInactive={0.4}
      />
    )
  })
  .add('stroke', () => {
    return (
      <PixelMap
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => yScale(d.value)}
        featureCollection={italy}
        projection={projection}
        stroke="#000"
        strokeInactive="#000"
        fillInactive="transparent"
        fill="transparent"
      />
    )
  })
  .add('tooltip', () => {
    return (
      <PixelMap
        side={side}
        data={defaultData}
        featureCollection={italy}
        projection={projection}
        coords={d => [d.lng, d.lat]}
        value={side * 0.9}
        valueInactive={side * 0.9}
        fill="#2d7688"
        fillInactive="#ccc"
        fillOpacity={d => zScale(d.value)}
        fillOpacityInactive={0.4}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
