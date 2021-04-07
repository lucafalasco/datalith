import notes from '@datalith/spiral/README.md'
import { Spiral } from '@datalith/spiral/src'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { Spring } from 'react-spring/renderprops'
import { genDateValue } from '../scripts'

const defaultData = genDateValue(110)

const y = d => d.value

// scales
const yScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([1, 20])

const opacityScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([0.3, 0.8])

storiesOf('DATALITHS|Spiral', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = defaultData.map(d => yScale(d.value))
    return <Spiral data={data} />
  })
  .add('archimedean', () => {
    return (
      <Spiral
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        value={d => yScale(d.value)}
        fill="#0bbba9"
        fillOpacity={d => opacityScale(d.value)}
        getSpiralCoords={({ width, height }) => {
          let angle = 0
          const coords: Array<{ x: number; y: number }> = []
          const increment = 0.12
          const aperture = Math.min(width, height) / 10

          for (let i = 0; i < defaultData.length; i++) {
            const radius = aperture + i * 2

            coords.push({
              x: radius * Math.cos(angle),
              y: radius * Math.sin(angle),
            })
            angle += increment
          }

          return coords
        }}
      />
    )
  })
  .add('custom spiral', () => {
    return (
      <Spiral
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        fill="#12c5e5"
        fillOpacity={d => opacityScale(d.value)}
        value={d => yScale(d.value)}
        getSpiralCoords={({ width, height }) => {
          let angle = 0
          const coords: Array<{ x: number; y: number }> = []
          const aperture = Math.min(width, height) / 20

          for (let i = 0; i < defaultData.length; i++) {
            const radius = aperture + i * 3

            coords.push({
              x: radius * Math.cos(angle),
              y: radius * Math.sin(angle),
            })
            angle += 1 / radius - 20
          }

          return coords
        }}
      />
    )
  })
  .add('outline', () => {
    return (
      <Spiral
        style={{ backgroundColor: '#171f2c' }}
        data={defaultData}
        value={d => yScale(d.value)}
        fill="transparent"
        stroke="#12c5e5"
        strokeOpacity={d => opacityScale(d.value)}
      />
    )
  })
  .add('animated', () => {
    return (
      <Spring
        config={{ duration: 1000, easing: t => t * (2 - t) }}
        from={{ index: 0 }}
        to={{ index: defaultData.length }}
      >
        {props => {
          const data = defaultData.slice(0, props.index)

          return (
            <Spiral
              style={{ backgroundColor: '#171f2c' }}
              fill="#12c5e5"
              data={data}
              value={(d, i) => yScale(d.value)}
            />
          )
        }}
      </Spring>
    )
  })
  .add('tooltip', () => {
    const sortedData = [...defaultData].sort((a, b) => a.date.getTime() - b.date.getTime())
    return (
      <Spiral
        data={sortedData}
        style={{ backgroundColor: '#171f2c' }}
        value={d => yScale(d.value)}
        fill="#6f42c1"
        fillOpacity={d => opacityScale(d.value)}
        tooltip={({ date, value }) =>
          `<p><b>Date: </b><u>${date.toLocaleDateString()}</u></p>
          <p><b>Value: </b>${yScale.invert(Number(value)).toFixed(2)}</p>`
        }
      />
    )
  })
