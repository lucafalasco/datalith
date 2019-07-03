import { PixelMapUs } from '@datalith/pixelmap/src'
import notes from '@datalith/pixelmap/src/components/PixelMapUs/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const defaultData = genCoordsValueUs(1000)
const side = 5

storiesOf('PixelMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <PixelMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
      />
    )
  })
  .add('stroke', () => {
    return (
      <PixelMapUs
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
      <PixelMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
