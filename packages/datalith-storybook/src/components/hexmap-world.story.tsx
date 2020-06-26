import { HexMapWorld } from '@datalith/hexmap/src'
import notes from '@datalith/hexmap/src/components/HexMapWorld/README.md'
import { storiesOf } from '@storybook/react'
import { geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { genCoordsValue } from '../scripts'

const defaultData = genCoordsValue(2000)
const side = 5

storiesOf('DATALITHS|HexMap.HexMapWorld', module)
  .addParameters({ notes })
  .add('natural earth', () => {
    return (
      <HexMapWorld
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
      />
    )
  })
  .add('orthographic', () => {
    return (
      <HexMapWorld
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        projection={geoOrthographic()}
      />
    )
  })
  .add('stroke', () => {
    return (
      <HexMapWorld
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        stroke="#000"
        fill="transparent"
      />
    )
  })
  .add('tooltip', () => {
    return (
      <HexMapWorld
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
