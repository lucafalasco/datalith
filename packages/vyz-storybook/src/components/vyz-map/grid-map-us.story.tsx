import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { GridMapUs } from 'vyz-map/src/components/GridMapUs'
import notes from 'vyz-map/src/components/GridMapUs/README.md'
import { genCoordsValueUs } from '../../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genCoordsValueUs(2000)
const side = 5

storiesOf('vyz-map/GridMapUs', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <GridMapUs
        width={width}
        height={height}
        side={side}
        data={data}
        stroke
        customRender={({ x, y, value }, defaultProps) => (
          <path
            strokeWidth={value * 0.5}
            d={`M${x - value / 2} ${y - value / 2} 
                L${x + value / 2} ${y + value / 2} 
                M${x + value / 2} ${y - value / 2} 
                L${x - value / 2} ${y + value / 2}`}
            {...defaultProps}
          />
        )}
      />
    )
  })
  .add('custom - text', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <GridMapUs
        width={width}
        height={height}
        side={side}
        data={data}
        customRender={({ x, y, datum }, defaultProps) => (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={5}
            alignmentBaseline="middle"
            {...defaultProps}
          >
            {datum ? 1 : 0}
          </text>
        )}
      />
    )
  })
  .add('custom - triangles', () => {
    const data = defaultData.map(d => ({
      v: [d.lng, d.lat],
      y: d.value,
    }))

    return (
      <GridMapUs
        width={width}
        height={height}
        side={side}
        data={data}
        stroke
        customRender={({ x, y, value }, defaultProps) => (
          <path
            strokeWidth={value * 0.5}
            d={`M${x - value / 2} ${y + value / 2} 
                L${x + value / 2} ${y + value / 2} 
                L${x} ${y - value / 2} 
                Z`}
            {...defaultProps}
          />
        )}
      />
    )
  })
