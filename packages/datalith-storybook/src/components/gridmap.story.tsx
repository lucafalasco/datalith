import { GridMap } from '@datalith/gridmap/src'
import notes from '@datalith/gridmap/src/components/GridMap/README.md'
import italyTopology from '@datalith/gridmap/src/json/italy.json'
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
  .range([2, side * 0.8])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

storiesOf('DATALITHS|GridMap.GridMap', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    return (
      <GridMap
        style={{ backgroundColor: '#082e3a' }}
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => yScale(d.value)}
        stroke="#04FFBF"
        featureCollection={italy}
        projection={projection}
        customRender={({ x, y, value, datum }, defaultProps) =>
          datum !== undefined ? (
            <path
              strokeWidth={1}
              strokeLinecap="round"
              d={`M${x - value / 2} ${y - value / 2} 
                L${x + value / 2} ${y + value / 2} 
                M${x + value / 2} ${y - value / 2} 
                L${x - value / 2} ${y + value / 2}`}
              {...defaultProps}
            />
          ) : (
            <circle cx={x} cy={y} r={2} fill="#ccc" fillOpacity={0.2} />
          )
        }
      />
    )
  })
  .add('custom - text', () => {
    const data = defaultData.map(d => [d.lng, d.lat])

    return (
      <GridMap
        side={side}
        data={data}
        featureCollection={italy}
        projection={projection}
        fillOpacityInactive={0.2}
        customRender={({ x, y, datum }, defaultProps) => (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={10}
            fontFamily="monospace"
            fontWeight={700}
            alignmentBaseline="middle"
            {...defaultProps}
          >
            {datum ? '1' : '0'}
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
        featureCollection={italy}
        projection={projection}
        coords={d => [d.lng, d.lat]}
        value={d => yScale(d.value) * 0.7}
        fill="#2d7688"
        fillOpacity={d => zScale(d.value)}
        customRender={({ x, y, value, datum }, defaultProps) =>
          datum ? (
            <path
              d={`M${x - value} ${y + value} 
                L${x + value} ${y + value} 
                L${x} ${y - value} 
                Z`}
              {...defaultProps}
            />
          ) : (
            <circle cx={x} cy={y} r={2} fill="#ccc" fillOpacity={0.5} />
          )
        }
      />
    )
  })
