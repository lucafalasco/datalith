import notes from '@datalith/barcode/README.md'
import { BarCode } from '@datalith/barcode/src'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { easeInOutCubic } from '../lib'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(100)

const y = d => d.value

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stopColor="#FF00C7" />
      <stop offset="100%" stopColor="#3800FF" />
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

storiesOf('DATALITHS|BarCode', module)
  .addParameters({ notes })
  .add('default', () => {
    return (
      <BarCode data={defaultData} value={d => yScale(d.value)} fillOpacity={d => zScale(d.value)} />
    )
  })
  .add('colors', () => {
    return (
      <BarCode
        style={{ backgroundColor: '#082e3a' }}
        data={defaultData}
        value={d => yScale(d.value)}
        fill="#04FFBF"
        fillOpacity={() => Math.random()}
      />
    )
  })
  .add('strip', () => {
    return (
      <BarCode data={defaultData} value={100} barWidth={7} fillOpacity={d => zScale(d.value)} />
    )
  })
  .add('stroke', () => {
    const data = defaultData.map(d => yScale(d.value))
    return (
      <BarCode
        style={{ backgroundColor: '#082e3a' }}
        data={defaultData}
        value={d => yScale(d.value)}
        stroke="#fff"
        strokeOpacity={d => zScale(d.value)}
        fill="transparent"
      />
    )
  })
  .add('animated', () => {
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
              data={data}
              value={d => yScale(d.value)}
              fill="blue"
              fillOpacity={(d, i) => props.opacity[i]}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    return (
      <BarCode
        data={defaultData}
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
  })
