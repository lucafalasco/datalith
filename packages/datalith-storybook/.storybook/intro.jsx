import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Logo from './logo.svg'

storiesOf('INTRODUCTION|Getting Started', module).add(
  'README',
  () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '40%', position: 'relative' }}>
          <img
            src={Logo}
            width="150"
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
        <div
          style={{
            textAlign: 'center',
            height: '60%',
            padding: '0 2rem 2rem 2rem',
            fontSize: 18,
            lineHeight: 1.5,
          }}
        >
          <p>
            <b>Datalith</b> is a collection of clean, lightweight and easily customizable <br />
            <b>React components for data visualization.</b>
          </p>
          <br />
          <span style={{ fontSize: 16 }}>single install:</span>
          <br />
          <code>yarn add datalith</code>
          <br />
          <br />
          <span style={{ fontSize: 16 }}>scoped packages install:</span>
          <br />
          <code>yarn add @datalith/flower @datalith/hexmap</code>
          <br />
          <br />
          <p>
            Select a <b>datalith</b> from the sidebar to see example usage. <br />
            You can read the documentation for each component by clicking on the <b>Notes</b> tab on
            the top toolbar.
            <br />
            <br />
            <span style={{ color: '#5a768a', fontSize: 16 }}>
              Code for the stories is available on{' '}
              <a
                target="_blank"
                href="https://github.com/lucafalasco/datalith/tree/master/packages/datalith-storybook/src/components"
                style={{ color: '#5a768a' }}
              >
                <b>Github</b>
              </a>
            </span>
          </p>
        </div>
      </div>
    )
  },
  { options: { isToolshown: false } },
)
