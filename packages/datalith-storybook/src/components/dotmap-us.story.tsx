import { DotMapUs } from '@datalith/dotmap/src'
import notes from '@datalith/dotmap/src/components/DotMapUs/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const defaultData = genCoordsValueUs(1000)
const side = 5

storiesOf('DotMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <DotMapUs side={side} data={defaultData} coords={d => [d.lng, d.lat]} value={d => d.value} />
    )
  })
  .add('stroke', () => {
    return (
      <DotMapUs
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
      <DotMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
