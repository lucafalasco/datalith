import { GridMap } from '@datalith/gridmap/src'
import notes from '@datalith/gridmap/src/components/GridMap/README.md'
import italyTopology from '@datalith/gridmap/src/json/italy.json'
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

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#238ab0" />
      <stop offset="100%" stop-color="#04ffbf" />
    </linearGradient>
  </defs>
)

storiesOf('GridMap', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    return (
      <GridMap
        style={{ backgroundColor: '#303030' }}
        data={defaultData}
        defs={defs}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        stroke="url('#gradient')"
        featureCollection={italy}
        projection={projection}
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
    const data = defaultData.map(d => [d.lng, d.lat])

    return (
      <GridMap
        style={{ backgroundColor: '#303030' }}
        side={side}
        data={data}
        fill={d => (d ? '#04FFBF' : '#fff')}
        featureCollection={italy}
        projection={projection}
        customRender={({ x, y, datum }, defaultProps) => (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={5}
            fontWeight={700}
            alignmentBaseline="middle"
            {...defaultProps}
          >
            {datum ? '|' : '―'}
          </text>
        )}
      />
    )
  })
  .add('custom - triangles', () => {
    return (
      <GridMap
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        fill="#000"
        featureCollection={italy}
        projection={projection}
        customRender={({ x, y, value }, defaultProps) => (
          <path
            strokeWidth={value * 0.5}
            d={`M${x - value} ${y + value} 
                L${x + value} ${y + value} 
                L${x} ${y - value} 
                Z`}
            {...defaultProps}
          />
        )}
      />
    )
  })
