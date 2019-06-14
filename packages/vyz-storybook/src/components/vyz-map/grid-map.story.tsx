import { storiesOf } from '@storybook/react'
import { geoNaturalEarth1, geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import { GridMap } from 'vyz-map/src/components/GridMap'
import notes from 'vyz-map/src/components/GridMap/README.md'
import italyTopology from 'vyz-map/src/json/italy.json'
import { genCoordsValueIt } from '../../scripts'

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

storiesOf('vyz-map/GridMap', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <GridMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
        stroke
        customRender={({ x, y, value }, defaultProps) => (
          <path
            strokeWidth={value * 0.5}
            d={`M${x - value / 2} ${y - value / 2} 
                L${x + value / 2} ${y + value / 2} 
                M${x + value / 2} ${y - value / 2} 
                L${x - value / 2} ${y + value / 2}`}
            {...defaultProps}
          />
        )}
      />
    )
  })
  .add('custom - text', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <GridMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
        customRender={({ x, y, datum }, defaultProps) => (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={5}
            alignmentBaseline="middle"
            {...defaultProps}
          >
            {datum ? 1 : 0}
          </text>
        )}
      />
    )
  })
  .add('custom - triangles', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <GridMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
        stroke
        customRender={({ x, y, value }, defaultProps) => (
          <path
            strokeWidth={value * 0.5}
            d={`M${x - value / 2} ${y + value / 2} 
                L${x + value / 2} ${y + value / 2} 
                L${x} ${y - value / 2} 
                Z`}
            {...defaultProps}
          />
        )}
      />
    )
  })
