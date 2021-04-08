import * as React from 'react'
import Logo from '../../public/logo.svg'

export default {
  title: 'INTRO/Getting Started',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
}

export const readme = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        fontSize: 20,
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          width: '100%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Logo} width="350px" style={{ margin: '2rem 0' }} />
        <p style={{ marginTop: 50, width: `100%`, maxWidth: 450 }}>
          <b>Datalith</b> is a collection of clean, lightweight and easily customizable{' '}
          <b>React components for data visualization.</b>
        </p>
        <div
          style={{
            textAlign: 'left',
            width: '100%',
            maxWidth: 450,
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
        <p style={{ fontSize: 18, width: `100%`, maxWidth: 450 }}>
          Select a <b>datalith</b> from the sidebar to see example usage. <br />
          You can read the documentation for each component by clicking on the <b>Docs</b> tab on
          the top toolbar.
          <br />
          <br />
          <span style={{ color: '#171f2c', fontSize: 16, fontWeight: 700 }}>
            View on{' '}
            <a
              target="_blank"
              href="https://github.com/lucafalasco/datalith/tree/master/packages/datalith-storybook/src/components"
              style={{ color: '#171f2c' }}
            >
              <b>Github</b>
            </a>
          </span>
        </p>
      </div>
    </div>
  )
}
