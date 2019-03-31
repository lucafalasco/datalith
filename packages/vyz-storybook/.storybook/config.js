import { configure, addParameters, addDecorator } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
import theme from './theme'

addParameters({
  options: {
    theme,
  },
})

// addDecorator(
//   withInfo({
//     styles: {
//       button: {
//         fontFamily: 'sans-serif',
//         fontSize: '14px',
//         fontWeight: '500',
//         display: 'block',
//         position: 'fixed',
//         border: '1px solid #333333',
//         borderRadius: '3px',
//         background: 'transparent',
//         color: '#333333',
//         padding: '5px 15px',
//         cursor: 'pointer',
//       },
//     },
//   }),
// )

function loadStories() {
  require('glob-loader!./stories.pattern')
}

configure(loadStories, module)
