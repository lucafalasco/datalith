import notes from '@datalith/pack/README.md'
import { Pack } from '@datalith/pack/src'
import { normalize } from '@datalith/util'
import { storiesOf } from '@storybook/react'
import { scaleLinear, scaleQuantize } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { easeInOutCubic } from '../lib'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(300)

const y = d => d.value

// scales
const yScale = scaleQuantize()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([5, 7, 10, 12, 15, 18, 20, 30, 40])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

storiesOf('DATALITHS|Pack', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <Pack data={defaultData} value={d => yScale(d.value)} fillOpacity={d => zScale(d.value2)} />
    )
  })
  .add('colors', () => {
    return (
      <Pack
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        value={d => yScale(d.value)}
        fill="#0bbba9"
        fillOpacity={() => Math.random()}
      />
    )
  })
  .add('outline', () => {
    const data = defaultData.map(d => yScale(d.value))
    return (
      <Pack
        style={{ backgroundColor: '#171f2c' }}
        data={data}
        stroke="#12c5e5"
        fill="transparent"
      />
    )
  })
  .add('animated', () => {
    const sortedData = [...defaultData].sort((a, b) => b.value - a.value)
    return (
      <Spring
        from={{ index: 0 }}
        to={{ index: defaultData.length }}
        config={{ duration: 1500, easing: easeInOutCubic }}
      >
        {props => {
          const data = sortedData.slice(0, props.index)

          return (
            <Pack
              style={{ backgroundColor: '#171f2c' }}
              data={data}
              value={d => yScale(d.value)}
              fill="#6f42c1"
              stroke="#171f2c"
              fillOpacity={d => zScale(d.value)}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <Pack
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        value={d => yScale(d.value)}
        fill="#00d09b"
        fillOpacity={d => zScale(d.value2)}
        stroke="#171f2c"
        strokeOpacity={0.5}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${Number(value).toFixed(2)}</p>`
        }
      />
    )
  })
