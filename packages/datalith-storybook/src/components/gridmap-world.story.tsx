import { GridMapWorld } from '@datalith/gridmap/src'
import notes from '@datalith/gridmap/src/components/GridMapWorld/README.md'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { genCoordsValue } from '../scripts'

const defaultData = genCoordsValue(2000)
const side = 5

storiesOf('DATALITHS|GridMap.GridMapWorld', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    return (
      <GridMapWorld
        style={{ backgroundColor: '#082e3a' }}
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => d.value}
        stroke="#04FFBF"
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
