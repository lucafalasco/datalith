import italyTopology from '@datalith/gridmap/src/json/italy.json'
import { HexMap } from '@datalith/hexmap'
import notes from '@datalith/hexmap/src/components/HexMap/README.md'
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

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValueIt(2000)
const side = 5
const italy = feature(italyAtlas, (italyAtlas as ItalyAtlas).objects.sub)
const projection = geoNaturalEarth1()

storiesOf('HexMap/HexMap', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <HexMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
      />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <HexMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
        stroke
        fill={false}
      />
    )
  })
  .add('tooltip', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <HexMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
        tooltip={({ v, y, z }) => `<p><b>Value: </b>${y && y.toFixed(2)}</p>`}
      />
    )
  })
