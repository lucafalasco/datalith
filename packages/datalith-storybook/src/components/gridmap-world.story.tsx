import { GridMapWorld } from '@datalith/gridmap/src'
import notes from '@datalith/gridmap/src/components/GridMapWorld/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValue } from '../scripts'

const defaultData = genCoordsValue(2000)
const side = 5

const defs = (
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#238ab0" />
      <stop offset="100%" stop-color="#04ffbf" />
    </linearGradient>
  </defs>
)

storiesOf('GridMapWorld', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    return (
      <GridMapWorld
        style={{ backgroundColor: '#303030' }}
        side={side}
        data={defaultData}
        additionalElements={defs}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        stroke="url('#gradient')"
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
    return (
      <GridMapWorld
        side={side}
        data={defaultData}
        fillOpacity={d => (d ? 1 : 0.4)}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        customRender={({ x, y, datum }, defaultProps) => (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={5}
            fontWeight={700}
            alignmentBaseline="middle"
            {...defaultProps}
          >
            {datum ? '|' : '―'}
          </text>
        )}
      />
    )
  })
  .add('custom - triangles', () => {
    return (
      <GridMapWorld
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        customRender={({ x, y, value }, defaultProps) => (
          <path
            strokeWidth={value * 0.5}
            d={`M${x - value} ${y + value} 
                L${x + value} ${y + value} 
                L${x} ${y - value} 
                Z`}
            {...defaultProps}
          />
        )}
      />
    )
  })
