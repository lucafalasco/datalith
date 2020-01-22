import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Logo from './logo.svg'

storiesOf('DATALITH', module).add(
  'intro',
  () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '60%', position: 'relative' }}>
          <img
            src={Logo}
            width="400"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>
            <b>Datalith</b> is a collection of clean, lightweight and easily customizable <br />
            <b>React components for data visualization.</b>
          </p>

          <p>
            <u>
              Select a <b>datalith</b> from the sidebar
            </u>{' '}
            to see example usage. <br />
            You can read the documentation for each component by clicking on the <i>Notes</i> tab on
            the top toolbar. <br />
            Code for the stories is available on{' '}
            <a
              target="_blank"
              href="https://github.com/lucafalasco/datalith/tree/master/packages/datalith-storybook/src/components"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    )
  },
  { options: { isToolshown: false } },
)
