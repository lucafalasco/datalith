import notes from '@datalith/flower/README.md'
import { Flower } from '@datalith/flower/src'
import { normalize } from '@datalith/util'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { easeInOutCubic } from '../lib'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(20)

const y = d => d.value

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stopColor="#6f42c1" />
      <stop offset="100%" stopColor="#0bbba9" />
    </linearGradient>
  </defs>
)

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, Math.min(width, height) * 0.2])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

storiesOf('DATALITHS|Flower', module)
  .addParameters({ notes })
  .add('default', () => {
    return <Flower data={defaultData} value={d => yScale(d.value)} />
  })
  .add('outline', () => {
    const data = defaultData.map(d => yScale(d.value))
    return (
      <Flower
        style={{ backgroundColor: '#171f2c' }}
        data={data}
        stroke="#0bbba9"
        fill="transparent"
      />
    )
  })
  .add('sorted', () => {
    const data = [...defaultData].sort((a, b) => b.value - a.value)

    return (
      <Flower
        style={{ backgroundColor: '#171f2c' }}
        data={data}
        value={d => yScale(d.value)}
        fill="#12c5e5"
        fillOpacity={(d, i) => normalize(i + 1, 1, data.length)}
      />
    )
  })
  .add('animated', () => {
    return (
      <Spring
        from={{ value: defaultData.map(d => 0) }}
        to={{ value: defaultData.map(y) }}
        config={{ duration: 1000, easing: easeInOutCubic }}
      >
        {props => {
          return (
            <Flower
              style={{ backgroundColor: '#171f2c' }}
              data={defaultData}
              value={(d, i) => yScale(props.value[i])}
              fill={(d, i) => (i % 2 ? '#12c5e5' : '#6f42c1')}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Flower
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        value={d => yScale(d.value)}
        fill="#00d09b"
        fillOpacity={d => zScale(d.value)}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
  .add('gradient', () => {
    return (
      <Flower
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        additionalElements={defs}
        value={d => yScale(d.value)}
        fill="url('#gradient')"
      />
    )
  })
