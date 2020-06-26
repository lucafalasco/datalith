import { configure, addParameters } from '@storybook/react'
import theme from './theme'

addParameters({
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
  options: {
    theme,
    showPanel: false,
    isToolshown: true,
  },
})

function loadStories() {
  require('./intro')
  require('glob-loader!./stories.pattern')
}

configure(loadStories, module)
