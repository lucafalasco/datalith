import { BarCode, BarCodeComponent } from '@datalith/barcode/src'
import { scaleLinear } from 'd3-scale'
import React from 'react'
import { Spring } from 'react-spring/renderprops'
import { easeInOutCubic } from '../lib'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(100)
const defaultDataLong = genDateValue(200)

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
  .range([0, 100])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

export default {
  title: 'DATALITHS/BarCode',
  component: BarCodeComponent,
}

export const basic = () => (
  <BarCode data={defaultData} value={d => yScale(d.value)} fillOpacity={d => zScale(d.value)} />
)
export const large = () => {
  return (
    <BarCode
      style={{ backgroundColor: '#171f2c' }}
      data={defaultDataLong}
      value={d => yScale(d.value)}
      fill="#12c5e5"
      fillOpacity={d => zScale(d.value)}
    />
  )
}
export const strip = () => {
  return (
    <BarCode
      style={{ backgroundColor: '#171f2c' }}
      data={defaultData}
      value={100}
      barWidth={7}
      fill="#0bbba9"
      fillOpacity={d => zScale(d.value)}
    />
  )
}
export const animated = () => {
  return (
    <Spring
      from={{ index: 0, opacity: defaultData.map(d => 0) }}
      to={{ index: defaultData.length, opacity: defaultData.map(d => zScale(d.value)) }}
      config={{ duration: 1500, easing: easeInOutCubic }}
    >
      {props => {
        const data = defaultData.slice(0, props.index)

        return (
          <BarCode
            style={{ backgroundColor: '#171f2c' }}
            data={data}
            value={d => yScale(d.value)}
            fill="#6f42c1"
            fillOpacity={(d, i) => props.opacity[i]}
          />
        )
      }}
    </Spring>
  )
}
export const tooltip = () => {
  return (
    <BarCode
      style={{ backgroundColor: '#171f2c' }}
      data={defaultDataLong}
      additionalElements={defs}
      value={d => yScale(d.value)}
      fill="url(#gradient)"
      fillOpacity={d => zScale(d.value)}
      tooltip={({ date, value }) =>
        `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
        <p><b>Value: </b>${Number(value).toFixed(2)}</p>`
      }
    />
  )
}
