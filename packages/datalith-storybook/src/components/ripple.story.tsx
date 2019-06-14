import { Ripple } from '@datalith/ripple'
import notes from '@datalith/ripple/README.md'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(10)

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
    const data = defaultData.map((d, i) => ({
      y: yScale(d.value),
      z: i % 2 ? 'rgb(22, 82, 240)' : 'rgba(22, 82, 240, 0.6)',
    }))
    return <Ripple width={width} height={height} data={data} />
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
        from={{ y: defaultData.map(d => 0), centerY: height / 2 + maxY, index: 0 }}
        to={{ y: defaultData.map(y), centerY: height / 2, index: defaultData.length - 1 }}
      >
        {props => {
          const data = defaultData
            .map((d, i) => ({
              y: yScale(props.y[i]),
              z: 'black',
            }))
            .sort((a, b) => b.y - a.y)
            .slice(0, props.index)

          return (
            <Ripple
              width={width}
              height={height}
              data={data}
              center={{ x: width / 2, y: props.centerY }}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    const data = defaultData.map(d => ({
      v: d.date,
      y: yScale(d.value),
      z: 'rgb(22, 82, 240)',
    }))
    return (
      <Ripple
        width={width}
        height={height}
        data={data}
        tooltip={({ v, y }) =>
          `<p><b>Date:</b><u>${v.toLocaleDateString()}</u></p> 
        <p><b>Value:</b>${yScale.invert(Number(y)).toFixed(2)}</p>`
        }
      />
    )
  })
