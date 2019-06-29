import React, { ComponentType } from 'react'
import { SizeMe } from 'react-sizeme'
import { CommonProps } from '.'

export default function ResponsiveWrapper<P extends CommonProps>(Component: ComponentType<P>) {
  return class Wrapper extends React.Component<P> {
    static defaultProps = {
      fill: true,
      stroke: false,
      ...(Component.defaultProps as Partial<P>),
    }

    render() {
      return this.props.size ? (
        <Component {...this.props} style={{ ...this.props.style, ...this.props.size }} />
      ) : (
        <SizeMe monitorWidth monitorHeight>
          {({ size }) => (
            <div style={{ width: '100%', height: '100%' }}>
              <Component {...this.props} style={{ ...this.props.style, ...size }} size={size} />
            </div>
          )}
        </SizeMe>
      )
    }
  }
}
