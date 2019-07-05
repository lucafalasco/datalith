import notes from '@datalith/spiral/README.md'
import { Spiral } from '@datalith/spiral/src'
import { normalize } from '@datalith/util'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(100)

const y = d => d.value

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#238ab0" />
      <stop offset="100%" stop-color="#04ffbf" />
    </linearGradient>
    <linearGradient id="gradient2">
      <stop offset="0%" stop-color="#f51268" />
      <stop offset="100%" stop-color="#ffdb4b" />
    </linearGradient>
  </defs>
)

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([1, 15])

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
        defs={defs}
        value={d => yScale(d.value)}
        // stroke="#000"
        fill={(d, i) => (i % 2 ? 'url("#gradient")' : 'url("#gradient2")')}
      />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return (
      <Spiral style={{ backgroundColor: '#303030' }} data={data} stroke="#fff" fill="transparent" />
    )
  })
  .add('animated', () => {
    return (
      <Spring
        config={{ duration: 1000, easing: t => t * (2 - t) }}
        from={{ index: 0 }}
        to={{ index: defaultData.length - 1 }}
      >
        {props => {
          const data = defaultData.slice(0, props.index)

          return <Spiral data={data} value={(d, i) => yScale(d.value)} />
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    const sortedData = [...defaultData].sort((a, b) => a.date.getTime() - b.date.getTime())
    return (
      <Spiral
        data={sortedData}
        value={d => yScale(d.value)}
        fill={(d, i) =>
          `rgba(4, 255, 191, ${normalize(d.value, yScale.domain()[0], yScale.domain()[1])}`
        }
        stroke="#000"
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
