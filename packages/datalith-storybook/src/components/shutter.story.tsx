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
    return <Shutter data={defaultData} fill={d => `rgba(0,0,0,${zScale(d.value)})`} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => `rgba(0,0,0,${zScale(d.value)})`)
    return <Shutter data={data} stroke="#000" fill="transparent" />
  })
  .add('sorted', () => {
    const data = [...defaultData].sort((a, b) => b.value - a.value)

    return <Shutter data={data} fill={d => `rgba(0,0,0,${zScale(d.value)})`} />
  })
  .add('animated', () => {
    const data = defaultData.map(d => `rgba(4, 255, 191, ${zScale(d.value).toFixed(2)}`)
    const radiusTo = (Math.min(width, height) / 2) * 0.7 - 50

    return (
      <Spring from={{ radius: 0 }} to={{ radius: radiusTo }}>
        {props => {
          return (
            <Shutter
              style={{ backgroundColor: '#303030' }}
              data={data}
              radiusInner={props.radius}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Shutter
        data={defaultData}
        fill={d => `rgba(0,0,0,${zScale(d.value)})`}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${parseFloat(zScale(value).toFixed(2))}</p>
          <p><b>Color: </b> rgba(0,0,0,${zScale(value).toFixed(2)})</p>`
        }
      />
    )
  })
