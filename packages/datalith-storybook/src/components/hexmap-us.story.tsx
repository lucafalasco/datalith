import { HexMapUs } from '@datalith/hexmap/src'
import notes from '@datalith/hexmap/src/components/HexMapUs/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValueUs(1000)
const side = 5

storiesOf('HexMap/HexMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return <HexMapUs width={width} height={height} side={side} data={data} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return <HexMapUs width={width} height={height} side={side} data={data} stroke fill={false} />
  })
  .add('tooltip', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <HexMapUs
        width={width}
        height={height}
        side={side}
        data={data}
        tooltip={({ v, y, z }) => `<p><b>Value: </b>${y && y.toFixed(2)}</p>`}
      />
    )
  })
