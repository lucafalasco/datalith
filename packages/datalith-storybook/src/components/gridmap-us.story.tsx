import { GridMapUs } from '@datalith/gridmap/src'
import notes from '@datalith/gridmap/src/components/GridMapUs/README.md'
import { storiesOf } from '@storybook/react'
import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import { genCoordsValueUs } from '../scripts'

const defaultData = genCoordsValueUs(1000)
const y = d => d.value
const side = 15

const yScale = scaleLinear()
  .domain([Math.min(...defaultData.map(y)), Math.max(...defaultData.map(y))])
  .range([1, side * 0.8])

const zScale = scaleLinear()
  .domain([0, Math.max(...defaultData.map(y))])
  .range([0.1, 0.9])
  .nice()

storiesOf('DATALITHS|GridMap.GridMapUs', module)
  .addParameters({ notes })
  .add('custom - cross', () => {
    return (
      <GridMapUs
        style={{ backgroundColor: '#082e3a' }}
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => yScale(d.value)}
        stroke="#04FFBF"
        customRender={({ x, y, value, datum }, defaultProps) =>
          datum !== undefined ? (
            <path
              strokeWidth={1}
              strokeLinecap="round"
              d={`M${x - value / 2} ${y - value / 2} 
                L${x + value / 2} ${y + value / 2} 
                M${x + value / 2} ${y - value / 2} 
                L${x - value / 2} ${y + value / 2}`}
              {...defaultProps}
            />
          ) : (
            <circle cx={x} cy={y} r={2} fill="#ccc" fillOpacity={0.2} />
          )
        }
      />
    )
  })
  .add('custom - text', () => {
    return (
      <GridMapUs
        side={side}
        data={defaultData}
        fillOpacityInactive={0.2}
        coords={d => [d.lng, d.lat]}
        customRender={({ x, y, datum }, defaultProps) => (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={10}
            fontFamily="monospace"
            fontWeight={700}
            alignmentBaseline="middle"
            {...defaultProps}
          >
            {datum ? '1' : '0'}
          </text>
        )}
      />
    )
  })
  .add('custom - triangles', () => {
    return (
      <GridMapUs
        side={side}
        data={defaultData}
        coords={d => [d.lng, d.lat]}
        value={d => yScale(d.value) * 0.7}
        fill="#2d7688"
        fillOpacity={d => zScale(d.value)}
        customRender={({ x, y, value, datum }, defaultProps) =>
          datum ? (
            <path
              d={`M${x - value} ${y + value} 
                L${x + value} ${y + value} 
                L${x} ${y - value} 
                Z`}
              {...defaultProps}
            />
          ) : (
            <circle cx={x} cy={y} r={2} fill="#ccc" fillOpacity={0.5} />
          )
        }
      />
    )
  })
