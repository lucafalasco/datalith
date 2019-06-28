import notes from '@datalith/flower/README.md'
import { Flower } from '@datalith/flower/src'
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
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, Math.min(width, height) * 0.3])

storiesOf('Flower', module)
  .addParameters({ notes })
  .add('default', () => {
    return <Flower width={width} height={height} data={defaultData} value={d => yScale(d.value)} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Flower width={width} height={height} data={data} stroke fill={false} />
  })
  .add('sorted', () => {
    const data = [...defaultData].sort((a, b) => b.value - a.value)

    return (
      <Flower
        width={width}
        height={height}
        data={data}
        value={d => yScale(d.value)}
        color={(d, i) => `rgba(0,0,0,0.${i + 1})`}
      />
    )
  })
  .add('animated', () => {
    return (
      <Spring from={{ value: defaultData.map(d => 0) }} to={{ value: defaultData.map(y) }}>
        {props => {
          return (
            <Flower
              width={width}
              height={height}
              data={defaultData}
              value={(d, i) => yScale(props.value[i])}
              color={(d, i) => (i % 2 ? '#04FFBF' : '#00d09b')}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Flower
        width={width}
        height={height}
        data={defaultData}
        value={d => yScale(d.value)}
        color="#04FFBF"
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
