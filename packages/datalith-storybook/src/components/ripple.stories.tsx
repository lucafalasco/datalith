import { Ripple, RippleComponent } from '@datalith/ripple/src'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { easeInOutCubic } from '../lib'
import { genDateValue } from '../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(20)

const y = d => d.value

// scales
const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([0, Math.min(width, height) * 0.3])
  .clamp(true)

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.9, 0.1])
  .nice()

export default {
  title: 'DATALITHS/Ripple',
  component: RippleComponent,
  args: {
    primary: true,
  },
}

export const basic = () => {
  const data = defaultData.map(d => yScale(d.value))
  return <Ripple data={data} />
}
export const colors = () => {
  return (
    <Ripple
      style={{ backgroundColor: '#171f2c' }}
      data={defaultData}
      value={d => yScale(d.value)}
      fill="#12c5e5"
      fillOpacity={() => Math.random() / 5}
    />
  )
}
export const outline = () => {
  const data = defaultData.map(d => yScale(d.value))
  return (
    <Ripple
      style={{ backgroundColor: '#171f2c' }}
      data={data}
      stroke="#0bbba9"
      fill="transparent"
    />
  )
}
export const animated = () => {
  const sortedData = [...defaultData].sort((a, b) => b.value - a.value)

  return (
    <Spring
      config={{ duration: 1000, easing: easeInOutCubic }}
      from={{ value: sortedData.map(d => 0), index: 0 }}
      to={{ value: sortedData.map(y), index: sortedData.length }}
    >
      {props => {
        const data = sortedData.slice(0, props.index)

        return (
          <Ripple
            style={{ backgroundColor: '#171f2c' }}
            data={data}
            fill="#6f42c1"
            fillOpacity={d => zScale(d.value)}
            value={(d, i) => yScale(props.value[i])}
          />
        )
      }}
    </Spring>
  )
}
export const tooltip = () => {
  return (
    <Ripple
      style={{ backgroundColor: '#171f2c' }}
      data={defaultData}
      value={d => yScale(d.value)}
      fill="#12c5e5"
      fillOpacity={d => zScale(d.value)}
      stroke="#171f2c"
      strokeOpacity={d => zScale(d.value)}
      tooltip={({ date, value }) =>
        `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${value.toFixed(2)}</p>`
      }
    />
  )
}
