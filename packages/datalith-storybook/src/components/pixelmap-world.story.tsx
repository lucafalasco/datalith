import { PixelMapWorld } from '@datalith/pixelmap/src'
import notes from '@datalith/pixelmap/src/components/PixelMapWorld/README.md'
import { storiesOf } from '@storybook/react'
import { geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { genCoordsValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValue(2000)
const side = 5

storiesOf('PixelMapWorld', module)
  .addParameters({ notes })
  .add('natural earth', () => {
    return (
      <PixelMapWorld
        width={width}
        height={height}
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
      />
    )
  })
  .add('orthographic', () => {
    return (
      <PixelMapWorld
        width={width}
        height={height}
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
      <PixelMapWorld
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
      <PixelMapWorld
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
