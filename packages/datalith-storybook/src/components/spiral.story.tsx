import notes from '@datalith/spiral/README.md'
import { Spiral } from '@datalith/spiral/src'
import { normalize } from '@datalith/util'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(300)

const y = d => d.value

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#238ab0" />
      <stop offset="100%" stop-color="#04ffbf" />
    </linearGradient>
  </defs>
)

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([5, 20])

storiesOf('Spiral', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Spiral data={data} />
  })
  .add('colors', () => {
    return (
      <Spiral
        data={defaultData}
        value={d => yScale(d.value)}
        fill={(d, i) => (i % 2 ? '#04ffbf' : '#f7f7f7')}
      />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Spiral data={data} stroke="#000" fill="transparent" />
  })
  .add('animated', () => {
    const maxY = Math.max(...defaultData.map(d => yScale(d.value)))
    const sortedData = [...defaultData].sort((a, b) => b.value - a.value)

    return (
      <Spring
        config={{ duration: 1000, easing: t => t * (2 - t) }}
        from={{ value: sortedData.map(d => 0), index: 0 }}
        to={{ value: sortedData.map(y), index: sortedData.length - 1 }}
      >
        {props => {
          const data = sortedData.slice(0, props.index)

          return <Spiral data={data} value={(d, i) => yScale(props.value[i])} />
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Spiral
        data={defaultData}
        defs={defs}
        value={d => yScale(d.value)}
        fill={(d, i) => `rgba(4, 255, 191, ${normalize(i, 0, defaultData.length)}`}
        stroke="#000"
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
