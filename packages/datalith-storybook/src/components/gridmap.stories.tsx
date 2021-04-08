import { GridMap, GridMapComponent, GridMapUs, GridMapWorld } from '@datalith/gridmap/src'
import italyTopology from '@datalith/gridmap/src/json/italy.json'
import { geoNaturalEarth1 } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { feature } from 'topojson'
import { genCoordsValue, genCoordsValueIt, genCoordsValueUs } from '../scripts'

interface ItalyAtlas extends TopoJSON.Topology {
  objects: {
    sub: TopoJSON.GeometryCollection
  }
}

const y = d => d.value
const defaultData = genCoordsValue(200)
const side = 10

const defaultDataUs = genCoordsValueUs(1000)
const defaultDataIt = genCoordsValueIt(200)
const italyAtlas = italyTopology as any
const italy = feature(italyAtlas, (italyAtlas as ItalyAtlas).objects.sub)
const projection = geoNaturalEarth1()

const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([1, side * 0.8])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

export default {
  title: 'DATALITHS/GridMap',
  component: GridMapComponent,
}

export const cross = () => {
  return (
    <GridMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      coords={d => [d.lng, d.lat]}
      value={d => yScale(d.value)}
      stroke="#0bbba9"
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
          <circle cx={x} cy={y} r={2} fill="#2b3a53" />
        )
      }
    />
  )
}
export const text = () => {
  return (
    <GridMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      fill="#12c5e5"
      fillInactive="#2b3a53"
      coords={d => [d.lng, d.lat]}
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
}
export const triangles = () => {
  return (
    <GridMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      coords={d => [d.lng, d.lat]}
      value={d => yScale(d.value) * 0.7}
      fill="#6f42c1"
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
          <circle cx={x} cy={y} r={2} fill="#2b3a53" />
        )
      }
    />
  )
}
export const us = () => {
  return (
    <GridMapUs
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultDataUs}
      coords={d => [d.lng, d.lat]}
      value={d => yScale(d.value) * 0.7}
      fill="#0bbba9"
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
          <circle cx={x} cy={y} r={2} fill="#2b3a53" />
        )
      }
    />
  )
}
export const customGeojson = () => {
  return (
    <GridMap
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultDataIt}
      featureCollection={italy}
      projection={projection}
      coords={d => [d.lng, d.lat]}
      value={d => yScale(d.value) * 0.7}
      fill="#6f42c1"
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
          <circle cx={x} cy={y} r={2} fill="#2b3a53" />
        )
      }
    />
  )
}
