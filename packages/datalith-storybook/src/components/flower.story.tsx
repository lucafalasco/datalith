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
    const data = defaultData.map(d => yScale(d.value))
    return <Flower width={width} height={height} data={data} />
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))

    return <Flower width={width} height={height} data={data} stroke fill={false} />
  })
  .add('sorted', () => {
    const data = defaultData
      .map((d, i) => ({
        y: yScale(d.value),
        z: `rgba(0,0,0,0.${i + 1})`,
      }))
      .sort((a, b) => b.y - a.y)

    return <Flower width={width} height={height} data={data} />
  })
  .add('animated', () => {
    return (
      <Spring from={{ y: defaultData.map(d => 0) }} to={{ y: defaultData.map(y) }}>
        {props => {
          const data = defaultData.map((d, i) => ({
            y: yScale(props.y[i]),
            z: i % 2 ? 'gray' : 'black',
          }))

          return <Flower width={width} height={height} data={data} />
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
      <Flower
        width={width}
        height={height}
        data={data}
        tooltip={({ v, y }) =>
          `<p><b>Date: </b><u>${v.toLocaleDateString()}</u></p> 
        <p><b>Value: </b>${yScale.invert(Number(y)).toFixed(2)}</p>`
        }
      />
    )
  })
