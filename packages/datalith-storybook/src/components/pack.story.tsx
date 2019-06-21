import notes from '@datalith/pack/README.md'
import { Pack } from '@datalith/pack/src'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(700)

const y = d => d.value

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([5, 30])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, 1])
  .nice()

storiesOf('Pack', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <Pack
        width={width}
        height={height}
        data={defaultData}
        value={d => yScale(d.value)}
        color={d => `rgba(0,0,0,${zScale(d.value2)})`}
      />
    )
  })
  .add('colors', () => {
    return (
      <Pack
        width={width}
        height={height}
        data={defaultData}
        value={d => yScale(d.value)}
        color={(d, i) => (i % 2 ? 'rgb(22, 82, 240)' : '#fff')}
      />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Pack width={width} height={height} data={data} stroke fill={false} />
  })
  .add('animated', () => {
    const sortedData = defaultData.sort((a, b) => b.value - b.value)
    return (
      <Spring
        config={{ duration: 2000 }}
        from={{ index: 0 }}
        to={{ index: defaultData.length - 1 }}
      >
        {props => {
          const data = sortedData.slice(0, props.index)

          return (
            <Pack
              width={width}
              height={height}
              data={data}
              value={d => yScale(d.value)}
              color={d => `rgba(0,0,0,${zScale(d.value2)})`}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Pack
        width={width}
        height={height}
        data={defaultData}
        value={d => yScale(d.value)}
        color={d => `rgba(0,0,0,${zScale(d.value)})`}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
