import { Shutter, ShutterComponent } from '@datalith/shutter/src'
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
const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 1])

export default {
  title: 'DATALITHS/Shutter',
  component: ShutterComponent,
}

export const basic = () => {
  return <Shutter data={defaultData} fillOpacity={d => zScale(d.value)} />
}
export const sorted = () => {
  const data = [...defaultData].sort((a, b) => b.value - a.value)

  return (
    <Shutter
      style={{ backgroundColor: '#171f2c' }}
      data={data}
      fill="#0bbba9"
      fillOpacity={d => zScale(d.value)}
    />
  )
}
export const animated = () => {
  const radiusTo = (Math.min(width, height) / 2) * 0.4

  return (
    <Spring
      from={{ radius: 0 }}
      to={{ radius: radiusTo }}
      config={{ duration: 1000, easing: easeInOutCubic }}
    >
      {props => {
        return (
          <Shutter
            style={{ backgroundColor: '#171f2c' }}
            data={defaultData}
            fill="#12c5e5"
            fillOpacity={d => zScale(d.value)}
            radiusInner={props.radius}
            radiusOuter={radiusTo + 50}
          />
        )
      }}
    </Spring>
  )
}
export const tooltip = () => {
  return (
    <Shutter
      style={{ backgroundColor: '#171f2c' }}
      data={defaultData}
      fill="#6f42c1"
      fillOpacity={d => zScale(d.value)}
      tooltip={({ date, value }) =>
        `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${parseFloat(zScale(value).toFixed(2))}</p>
          <p><b>Color: </b> rgba(0, 0, 255, ${zScale(value).toFixed(2)})</p>`
      }
    />
  )
}
