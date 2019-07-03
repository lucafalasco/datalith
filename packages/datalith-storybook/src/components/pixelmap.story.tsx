import italyTopology from '@datalith/gridmap/src/json/italy.json'
import { PixelMap } from '@datalith/pixelmap/src'
import notes from '@datalith/pixelmap/src/components/PixelMap/README.md'
import { storiesOf } from '@storybook/react'
import { geoNaturalEarth1 } from 'd3-geo'
import * as React from 'react'
import { feature } from 'topojson'
import { genCoordsValueIt } from '../scripts'

interface ItalyAtlas extends TopoJSON.Topology {
  objects: {
    sub: TopoJSON.GeometryCollection
  }
}

const italyAtlas = italyTopology as any

const defaultData = genCoordsValueIt(2000)
const side = 5
const italy = feature(italyAtlas, (italyAtlas as ItalyAtlas).objects.sub)
const projection = geoNaturalEarth1()

storiesOf('PixelMap', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <PixelMap
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        featureCollection={italy}
        projection={projection}
      />
    )
  })
  .add('stroke', () => {
    return (
      <PixelMap
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        featureCollection={italy}
        projection={projection}
        stroke="#000"
        fill="transparent"
      />
    )
  })
  .add('tooltip', () => {
    return (
      <PixelMap
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        featureCollection={italy}
        projection={projection}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
