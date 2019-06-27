import { PixelMapUs } from '@datalith/pixelmap/src'
import notes from '@datalith/pixelmap/src/components/PixelMapUs/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValueUs(1000)
const side = 5

storiesOf('PixelMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <PixelMapUs
        width={width}
        height={height}
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
        width={width}
        height={height}
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
      <PixelMapUs
        width={width}
        height={height}
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
