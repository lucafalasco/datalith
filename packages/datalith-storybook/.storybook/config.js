import { configure, addParameters, addDecorator } from '@storybook/react'
import theme from './theme'

addParameters({
  options: {
    theme,
    showPanel: false,
  },
})

function loadStories() {
  require('glob-loader!./stories.pattern')
}

configure(loadStories, module)
