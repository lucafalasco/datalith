import italyTopology from '@datalith/gridmap/src/json/italy.json'
import { HexMap, HexMapUs, HexMapWorld } from '@datalith/hexmap/src'
import { geoNaturalEarth1, geoOrthographic } from 'd3-geo'
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
const side = 12

const defaultDataUs = genCoordsValueUs(1000)
const defaultDataIt = genCoordsValueIt(200)
const italyAtlas = italyTopology as any
const italy = feature(italyAtlas, (italyAtlas as ItalyAtlas).objects.sub)
const projection = geoNaturalEarth1()

const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([1, side * 0.5])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

export default {
  title: 'DATALITHS/HexMap',
  component: HexMap,
}

export const naturalEarth = () => {
  return (
    <HexMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      coords={d => [d.lng, d.lat]}
      value={side * 0.5}
      valueInactive={side * 0.5}
      fill="#0bbba9"
      fillInactive="#2b3a53"
      fillOpacity={d => zScale(d.value)}
      fillOpacityInactive={0.4}
    />
  )
}
export const orthographic = () => {
  return (
    <HexMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      fill="#0bbba9"
      fillInactive="#2b3a53"
      coords={d => [d.lng, d.lat]}
      value={d => yScale(d.value)}
      projection={geoOrthographic()}
    />
  )
}
export const outline = () => {
  return (
    <HexMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      coords={d => [d.lng, d.lat]}
      value={d => yScale(d.value)}
      stroke="#12c5e5"
      strokeInactive="#12c5e5"
      fillInactive="transparent"
      fill="transparent"
    />
  )
}
export const tooltip = () => {
  return (
    <HexMapWorld
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultData}
      coords={d => [d.lng, d.lat]}
      value={side * 0.5}
      valueInactive={side * 0.5}
      fill="#6f42c1"
      fillInactive="#2b3a53"
      fillOpacity={d => zScale(d.value)}
      fillOpacityInactive={0.4}
      tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
    />
  )
}
export const us = () => {
  return (
    <HexMapUs
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultDataUs}
      coords={d => [d.lng, d.lat]}
      value={side * 0.5}
      valueInactive={side * 0.5}
      fill="#0bbba9"
      fillInactive="#2b3a53"
      fillOpacity={d => zScale(d.value)}
      fillOpacityInactive={0.4}
      tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
    />
  )
}
export const customGeojson = () => {
  return (
    <HexMap
      style={{ backgroundColor: '#171f2c' }}
      side={side}
      data={defaultDataIt}
      featureCollection={italy}
      projection={projection}
      coords={d => [d.lng, d.lat]}
      value={side * 0.5}
      valueInactive={side * 0.5}
      fill="#6f42c1"
      fillInactive="#2b3a53"
      fillOpacity={d => zScale(d.value)}
      fillOpacityInactive={0.4}
      tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
    />
  )
}
