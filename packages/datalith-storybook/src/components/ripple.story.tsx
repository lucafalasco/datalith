import notes from '@datalith/ripple/README.md'
import { Ripple } from '@datalith/ripple/src'
import { normalize } from '@datalith/util'
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
const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([0, Math.min(width, height) * 0.3])

storiesOf('Ripple', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Ripple data={data} />
  })
  .add('colors', () => {
    return (
      <Ripple
        data={defaultData}
        value={d => yScale(d.value)}
        fill={(d, i) => (i % 2 ? '#04ffbf' : '#f7f7f7')}
      />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Ripple data={data} stroke="#000" fill="transparent" />
  })
  .add('animated', () => {
    const sortedData = [...defaultData].sort((a, b) => b.value - a.value)

    return (
      <Spring
        config={{ duration: 1000, easing: t => t * (2 - t) }}
        from={{ value: sortedData.map(d => 0), index: 0 }}
        to={{ value: sortedData.map(y), index: sortedData.length - 1 }}
      >
        {props => {
          const data = sortedData.slice(0, props.index)

          return <Ripple data={data} value={(d, i) => yScale(props.value[i])} />
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Ripple
        data={defaultData}
        value={d => yScale(d.value)}
        fill={(d, i) => `rgba(4, 255, 191, ${normalize(i, 0, defaultData.length)}`}
        stroke="#fff"
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
