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
            width="400"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: '-250px auto auto auto',
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'center',
            height: '60%',
            padding: '0 2rem 2rem 2rem',
            fontSize: 20,
            lineHeight: 1.5,
          }}
        >
          <p>
            <b>Datalith</b> is a collection of clean, lightweight and easily customizable <br />
            <b>React components for data visualization.</b>
          </p>
          <div
            style={{
              textAlign: 'left',
              width: 450,
              margin: 'auto',
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 5 }}>Single install:</div>
            <code
              style={{
                borderRadius: 5,
                padding: 10,
                display: 'block',
              }}
            >
              $ yarn add datalith
            </code>
            <br />
            <div style={{ fontSize: 16, marginBottom: 5 }}>Scoped packages install:</div>
            <code
              style={{
                borderRadius: 5,
                padding: 10,
                display: 'block',
              }}
            >
              $ yarn add @datalith/flower @datalith/hexmap
            </code>
          </div>
          <br />
          <p style={{ fontSize: 18 }}>
            Select a <b>datalith</b> from the sidebar to see example usage. <br />
            You can read the documentation for each component by clicking on the <b>Notes</b> tab on
            the top toolbar.
            <br />
            <br />
            <span style={{ color: '#082e3a', fontSize: 16, fontWeight: 700 }}>
              Code for the stories is available on{' '}
              <a
                target="_blank"
                href="https://github.com/lucafalasco/datalith/tree/master/packages/datalith-storybook/src/components"
                style={{ color: '#082e3a' }}
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
