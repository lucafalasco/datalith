import { DotMapUs } from '@datalith/dotmap/src'
import notes from '@datalith/dotmap/src/components/DotMapUs/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValueUs(1000)
const side = 5

storiesOf('DotMap/DotMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <DotMapUs
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
      <DotMapUs
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
      <DotMapUs
        width={width}
        height={height}
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        tooltip={({ v, y, z }) => `<p><b>Value: </b>${y && y.toFixed(2)}</p>`}
      />
    )
  })
