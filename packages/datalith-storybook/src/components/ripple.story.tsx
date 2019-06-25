import notes from '@datalith/ripple/README.md'
import { Ripple } from '@datalith/ripple/src'
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

storiesOf('Ripple', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Ripple width={width} height={height} data={data} />
  })
  .add('colors', () => {
    return (
      <Ripple
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
    return <Ripple width={width} height={height} data={data} stroke fill={false} />
  })
  .add('animated', () => {
    const maxY = Math.max(...defaultData.map(d => yScale(d.value)))

    return (
      <Spring
        config={{ duration: 1000, easing: t => t * (2 - t) }}
        from={{ value: defaultData.map(d => 0), centerY: height / 2 + maxY, index: 0 }}
        to={{ value: defaultData.map(y), centerY: height / 2, index: defaultData.length - 1 }}
      >
        {props => {
          const data = defaultData.slice(0, props.index)

          return (
            <Ripple
              width={width}
              height={height}
              data={data}
              value={(d, i) => yScale(props.value[i])}
              color="#000"
              center={{ x: width / 2, y: props.centerY }}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Ripple
        width={width}
        height={height}
        data={defaultData}
        value={d => yScale(d.value)}
        color="rgb(22, 82, 240)"
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
