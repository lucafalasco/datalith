import { HexMapUs } from '@datalith/hexmap/src'
import notes from '@datalith/hexmap/src/components/HexMapUs/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const defaultData = genCoordsValueUs(1000)
const side = 5

storiesOf('HexMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <HexMapUs side={side} data={defaultData} coords={d => [d.lng, d.lat]} value={d => d.value} />
    )
  })
  .add('stroke', () => {
    return (
      <HexMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        stroke
        fill={false}
      />
    )
  })
  .add('tooltip', () => {
    return (
      <HexMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
