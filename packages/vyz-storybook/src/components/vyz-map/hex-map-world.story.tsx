import { storiesOf } from '@storybook/react'
import { geoOrthographic } from 'd3-geo'
import * as React from 'react'
import { HexMapWorld } from 'vyz-map/src/components/HexMapWorld'
import notes from 'vyz-map/src/components/HexMapWorld/README.md'
import { genCoordsValue } from '../../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValue(2000)
const side = 5

storiesOf('vyz-map/HexMapWorld', module)
  .addParameters({ notes })
  .add('natural earth', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return <HexMapWorld width={width} height={height} side={side} data={data} />
  })
  .add('orthographic', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <HexMapWorld
        width={width}
        height={height}
        side={side}
        data={data}
        projection={geoOrthographic()}
      />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return <HexMapWorld width={width} height={height} side={side} data={data} stroke fill={false} />
  })
  .add('tooltip', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <HexMapWorld
        width={width}
        height={height}
        side={side}
        data={data}
        tooltip={({ v, y, z }) => `<p><b>Value: </b>${y && y.toFixed(2)}</p>`}
      />
    )
  })
