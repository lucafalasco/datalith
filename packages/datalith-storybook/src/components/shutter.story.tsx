import notes from '@datalith/shutter/README.md'
import { Shutter } from '@datalith/shutter/src'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(20)

const y = d => d.value

// scales
const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, 1])

storiesOf('Shutter', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => `rgba(0,0,0,${zScale(d.value)})`)
    return <Shutter width={width} height={height} data={data} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => `rgba(0,0,0,${zScale(d.value)})`)

    return <Shutter width={width} height={height} data={data} stroke fill={false} />
  })
  .add('sorted', () => {
    const data = defaultData
      .map(d => ({
        y: d.value,
        z: `rgba(0,0,0,${zScale(d.value)})`,
      }))
      .sort((a, b) => b.y - a.y)

    return <Shutter width={width} height={height} data={data} stroke />
  })
  .add('animated', () => {
    const data = defaultData.map((d, i) => (i % 2 ? 'rgb(22, 82, 240)' : 'rgba(22, 82, 240, 0.6)'))
    const radiusTo = (Math.min(width, height) / 2) * 0.7 - 50

    return (
      <Spring from={{ radius: 0 }} to={{ radius: radiusTo }}>
        {props => {
          return <Shutter width={width} height={height} data={data} radiusInner={props.radius} />
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    const data = defaultData.map(d => ({
      v: d.date,
      y: parseFloat(zScale(d.value).toFixed(2)),
      z: `rgba(0,0,0,${zScale(d.value).toFixed(2)})`,
    }))
    return (
      <Shutter
        width={width}
        height={height}
        data={data}
        tooltip={({ v, y, z }) =>
          `<p><b>Date:</b> <u>${v.toLocaleDateString()}</u></p>
        <p><b>Value:</b>${y}</p>
        <p><b>Color:</b>${z}</p>`
        }
      />
    )
  })
