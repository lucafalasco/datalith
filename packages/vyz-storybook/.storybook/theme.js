import { create } from '@storybook/theming'
import Logo from './logo.svg'

export default create({
  // Is this a 'light' or 'dark' theme?
  base: 'light',

  // Color palette
  colorPrimary: '#FFFFFF', // primary color
  colorSecondary: '#333333', // secondary color

  // UI
  appBg: '#333333',
  appContentBg: '#F2F2F2',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 4,

  // Fonts
  fontBase:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  fontCode: 'Monaco, monospace',

  // Text colors
  textColor: '#7f7f7f',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#333333',
  barSelectedColor: '#333333',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 4,

  // Brand logo/text
  brandImage: Logo,
  brandTitle: 'vyz',
})
