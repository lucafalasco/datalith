import { storiesOf } from '@storybook/react'
import { geoNaturalEarth1, geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { feature, WorldAtlas } from 'topojson'
import { GridMap } from 'vyz-map/src/components/GridMap'
import notes from 'vyz-map/src/components/GridMap/README.md'
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

storiesOf('vyz-map/GridMap', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    return (
      <GridMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
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
    return (
      <GridMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
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
    return (
      <GridMap
        width={width}
        height={height}
        side={side}
        data={data}
        featureCollection={world}
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
// .add('animated', () => {
//   return (
//     <Spring from={{ y: data.map(d => 3) }} to={{ y: data.map(d => d.y) }}>
//       {props => {
//         return (
//           <GridMap
//             width={width}
//             height={height}
//             side={5}
//             data={data.map((d, i) => ({ ...d, y: props.y[i] }))}
//             featureCollection={world}
//             projection={projection}
//           />
//         )
//       }}
//     </Spring>
//   )
// })
