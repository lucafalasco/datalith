import { HexMapUs } from '@datalith/hexmap/src'
import notes from '@datalith/hexmap/src/components/HexMapUs/README.md'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const y = d => d.value
const defaultData = genCoordsValueUs(1000)
const side = 12

const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([1, side * 0.5])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

storiesOf('DATALITHS|HexMap.HexMapUs', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <HexMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={side * 0.5}
        valueInactive={side * 0.5}
        fill="#2D886D"
        fillInactive="#ccc"
        fillOpacity={d => zScale(d.value)}
        fillOpacityInactive={0.4}
      />
    )
  })
  .add('stroke', () => {
    return (
      <HexMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => yScale(d.value)}
        stroke="#000"
        strokeInactive="#000"
        fillInactive="transparent"
        fill="transparent"
      />
    )
  })
  .add('tooltip', () => {
    return (
      <HexMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={side * 0.5}
        valueInactive={side * 0.5}
        fill="#2d7688"
        fillInactive="#ccc"
        fillOpacity={d => zScale(d.value)}
        fillOpacityInactive={0.4}
        tooltip={({ value }) => `<p><b>Value: </b>${value.toFixed(2)}</p>`}
      />
    )
  })
