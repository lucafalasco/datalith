import { storiesOf } from '@storybook/react'
// import { scaleLinear } from 'd3-scale'
import { geoNaturalEarth1, geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { feature, WorldAtlas } from 'topojson'
import { DotMap } from 'vyz-map/src/components/DotMap'
import notes from 'vyz-map/src/components/DotMap/README.md'
import us from 'vyz-map/src/components/DotMap/us-geo.json'
import worldTopology from 'vyz-map/src/components/DotMap/world.json'
// import { genDateValue } from '../../scripts'

const width = window.innerWidth
const height = window.innerHeight
// const defaultData = genDateValue(200)

const world = feature(worldTopology as WorldAtlas, (worldTopology as WorldAtlas).objects.countries)
const projection = geoNaturalEarth1()
const data = [
  {
    v: [12.4964, 41.9028], // rome
    y: 10,
  },
  {
    v: [-74.006, 40.7128], // new york
    y: 25,
  },
  {
    v: [139.839478, 35.652832], // tokyo
    y: 5,
  },
]

storiesOf('vyz-map/DotMap', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <DotMap
        width={width}
        height={height}
        side={5}
        data={data}
        featureCollection={world}
        projection={projection}
      />
    )
  })

// storiesOf('vyz-map/DotMap', module)
//   .addParameters({ notes })
//   .add('animated', () => {
//     return (
//       <Spring config={{ duration: 10000 }} from={{ lat: 0 }} to={{ lat: 360 }}>
//         {props => {
//           return (
//             <DotMap
//               width={width}
//               height={height}
//               side={5}
//               data={data}
//               featureCollection={world}
//               projection={projection.rotate([props.lat, 0])}
//             />
//           )
//         }}
//       </Spring>
//     )
//   })
