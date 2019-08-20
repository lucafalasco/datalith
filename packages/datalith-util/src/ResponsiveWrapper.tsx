import React, { ComponentType } from 'react'
import { SizeMe } from 'react-sizeme'
import { CommonProps } from '.'

export default function ResponsiveWrapper<P extends CommonProps>(Component: ComponentType<P>) {
  return class Wrapper extends React.Component<P> {
    static defaultProps = Component.defaultProps as Partial<P>

    render() {
      return this.props.size ? (
        <Component {...this.props} style={{ ...this.props.style, ...this.props.size }} />
      ) : (
        <SizeMe monitorWidth monitorHeight>
          {({ size }) => (
            <div style={{ position: 'relative', height: '100%' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <Component
                  {...this.props}
                  style={{ ...size, ...this.props.style }}
                  size={{
                    width: (this.props.style && this.props.style.width) || size.width,
                    height: (this.props.style && this.props.style.height) || size.height,
                  }}
                />
              </div>
            </div>
          )}
        </SizeMe>
      )
    }
  }
}
