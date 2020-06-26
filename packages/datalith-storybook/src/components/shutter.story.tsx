import notes from '@datalith/shutter/README.md'
import { Shutter } from '@datalith/shutter/src'
import { storiesOf } from '@storybook/react'
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

storiesOf('DATALITHS|Shutter', module)
  .addParameters({ notes })
  .add('default', () => {
    return <Shutter data={defaultData} fillOpacity={d => zScale(d.value)} />
  })
  .add('stroke', () => {
    return (
      <Shutter
        style={{ backgroundColor: '#082e3a' }}
        data={defaultData}
        stroke="white"
        strokeOpacity={d => zScale(d.value)}
        fill="transparent"
      />
    )
  })
  .add('sorted', () => {
    const data = [...defaultData].sort((a, b) => b.value - a.value)

    return <Shutter data={data} fill="blue" fillOpacity={d => zScale(d.value)} />
  })
  .add('animated', () => {
    const radiusTo = (Math.min(width, height) / 2) * 0.5

    return (
      <Spring
        from={{ radius: 0 }}
        to={{ radius: radiusTo }}
        config={{ duration: 1000, easing: easeInOutCubic }}
      >
        {props => {
          return (
            <Shutter
              data={defaultData}
              fill="blue"
              fillOpacity={d => zScale(d.value)}
              radiusInner={props.radius}
              radiusOuter={radiusTo + 50}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Shutter
        data={defaultData}
        fill="blue"
        fillOpacity={d => zScale(d.value)}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${parseFloat(zScale(value).toFixed(2))}</p>
          <p><b>Color: </b> rgba(0, 0, 255, ${zScale(value).toFixed(2)})</p>`
        }
      />
    )
  })
