import { Flower, FlowerComponent } from '@datalith/flower/src'
import { normalize } from '@datalith/util'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { easeInOutCubic } from '../lib'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(20)

const y = d => d.value

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stopColor="#6f42c1" />
      <stop offset="100%" stopColor="#0bbba9" />
    </linearGradient>
  </defs>
)

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0, Math.min(width, height) * 0.2])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

export default {
  title: 'DATALITHS/Flower',
  component: FlowerComponent,
}

export const basic = () => {
  return <Flower data={defaultData} value={d => yScale(d.value)} />
}
export const outline = () => {
  const data = defaultData.map(d => yScale(d.value))
  return (
    <Flower
      style={{ backgroundColor: '#171f2c' }}
      data={data}
      stroke="#0bbba9"
      fill="transparent"
    />
  )
}
export const sorted = () => {
  const data = [...defaultData].sort((a, b) => b.value - a.value)

  return (
    <Flower
      style={{ backgroundColor: '#171f2c' }}
      data={data}
      value={d => yScale(d.value)}
      fill="#12c5e5"
      fillOpacity={(d, i) => normalize(i + 1, 1, data.length)}
    />
  )
}
export const animated = () => {
  return (
    <Spring
      from={{ value: defaultData.map(d => 0) }}
      to={{ value: defaultData.map(y) }}
      config={{ duration: 1000, easing: easeInOutCubic }}
    >
      {props => {
        return (
          <Flower
            style={{ backgroundColor: '#171f2c' }}
            data={defaultData}
            value={(d, i) => yScale(props.value[i])}
            fill={(d, i) => (i % 2 ? '#12c5e5' : '#6f42c1')}
          />
        )
      }}
    </Spring>
  )
}
export const tooltip = () => {
  return (
    <Flower
      style={{ backgroundColor: '#171f2c' }}
      data={defaultData}
      value={d => yScale(d.value)}
      fill="#00d09b"
      fillOpacity={d => zScale(d.value)}
      tooltip={({ date, value }) =>
        `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
      }
    />
  )
}
export const gradient = () => {
  return (
    <Flower
      style={{ backgroundColor: '#171f2c' }}
      data={defaultData}
      additionalElements={defs}
      value={d => yScale(d.value)}
      fill="url('#gradient')"
    />
  )
}
