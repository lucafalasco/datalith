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
      <stop offset="0%" stopColor="#04FFBF" />
      <stop offset="100%" stopColor="#8004ff" />
    </linearGradient>
  </defs>
)

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, Math.min(width, height) * 0.3])

storiesOf('Flower', module)
  .addParameters({ notes })
  .add('default', () => {
    return <Flower data={defaultData} value={d => yScale(d.value)} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return (
      <Flower style={{ backgroundColor: '#303030' }} data={data} stroke="#fff" fill="transparent" />
    )
  })
  .add('sorted', () => {
    const data = [...defaultData].sort((a, b) => b.value - a.value)

    return (
      <Flower
        data={data}
        value={d => yScale(d.value)}
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
              data={defaultData}
              value={(d, i) => yScale(props.value[i])}
              fill={(d, i) => (i % 2 ? '#04FFBF' : '#00d09b')}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Flower
        data={defaultData}
        value={d => yScale(d.value)}
        fill="#04FFBF"
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
        style={{ backgroundColor: '#303030' }}
      />
    )
  })
  .add('gradient', () => {
    return (
      <Flower
        data={defaultData}
        additionalElements={defs}
        value={d => yScale(d.value)}
        fill="url('#gradient')"
      />
    )
  })
