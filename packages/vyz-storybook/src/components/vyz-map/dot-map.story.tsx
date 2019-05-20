import { storiesOf } from '@storybook/react'
// import { scaleLinear } from 'd3-scale'
import * as React from 'react'
import notes from 'vyz-box/src/components/DotMap/README.md'
import { DotMap } from 'vyz-map/src/components/DotMap'
import { genDateValue } from '../../scripts'

const width = window.innerWidth
const height = window.innerHeight
const defaultData = genDateValue(200)

storiesOf('vyz-map/DotMap', module)
  .addParameters({ notes })
  .add('default', () => {
    const data = []
    return <DotMap width={width} height={height} data={data} />
  })
