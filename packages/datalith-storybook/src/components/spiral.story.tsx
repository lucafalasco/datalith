import notes from '@datalith/spiral/README.md'
import { Spiral } from '@datalith/spiral/src'
import { normalize } from '@datalith/util'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(110)

const y = d => d.value

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([1, 20])

storiesOf('Spiral', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Spiral data={data} />
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
        fill="blue"
        fillOpacity={d => normalize(d.value, yScale.domain()[0], yScale.domain()[1])}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
