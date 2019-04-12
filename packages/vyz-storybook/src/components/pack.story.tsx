import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { Pack } from '../../../vyz-box/src/components/Pack'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(200)

const y = d => d.value

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([5, 30])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, 1])
  .nice()

storiesOf('vyz-box/Pack', module)
  .add('default', () => {
    const data = defaultData.map(d => ({
      y: yScale(d.value),
      z: `rgba(0,0,0,${zScale(d.value2)})`,
    }))
    return <Pack width={width} height={height} data={data} />
  })
  .add('colors', () => {
    const data = defaultData.map((d, i) => ({
      y: yScale(d.value),
      z: i % 2 ? 'rgb(22, 82, 240)' : 'rgba(22, 82, 240, 0.6)',
    }))
    return <Pack width={width} height={height} data={data} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => ({
      y: yScale(d.value),
    }))

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
          const data = sortedData.slice(0, props.index).map((d, i) => ({
            y: yScale(d.value),
            z: `rgba(0,0,0,${zScale(d.value2)})`,
          }))

          return <Pack width={width} height={height} data={data} />
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    const data = defaultData.map(d => ({
      v: d.date,
      y: yScale(d.value),
      z: `rgba(0,0,0,${zScale(d.value)})`,
    }))
    return (
      <Pack
        width={width}
        height={height}
        data={data}
        tooltip={({ v, y }) =>
          `<p><b>Date:</b> <u>${v.toLocaleDateString()}</u></p> 
        <p><b>Value:</b>${yScale.invert(Number(y)).toFixed(2)}</p>`
        }
      />
    )
  })
