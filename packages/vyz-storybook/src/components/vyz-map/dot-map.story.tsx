import { storiesOf } from '@storybook/react'
import { geoNaturalEarth1, geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import { DotMap } from 'vyz-map/src/components/DotMap'
import notes from 'vyz-map/src/components/DotMap/README.md'
import us from 'vyz-map/src/components/json/us-geo.json'
import worldTopology from 'vyz-map/src/components/json/world.json'
// import { genDateValue } from '../../scripts'

const width = window.innerWidth
const height = window.innerHeight
// const defaultData = genDateValue(200)
const data = [
  {
    v: [12.4964, 41.9028], // rome
    y: 10,
    z: 'blue',
  },
  {
    v: [12.4964, 41.9027], // rome
    y: 20,
    z: 'blue',
  },
  {
    v: [-74.006, 40.7128], // new york
    y: 25,
    z: 'red',
  },
  {
    v: [139.839478, 35.652832], // tokyo
    y: 5,
    z: 'purple',
  },
]

const side = 5
const world = feature(worldTopology as WorldAtlas, (worldTopology as WorldAtlas).objects.countries)
const projection = geoNaturalEarth1()

storiesOf('vyz-map/DotMap', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <DotMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
        projection={projection}
      />
    )
  })
  .add('stroke', () => {
    return (
      <DotMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
        projection={projection}
        stroke
        fill={false}
      />
    )
  })
  .add('tooltip', () => {
    return (
      <DotMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
        projection={projection}
        tooltip={({ v, y, z }) =>
          `<p><b>Value: </b>${y}</p>
          <p><b>Color: </b>${z}</p>`
        }
      />
    )
  })
