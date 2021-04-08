import { create } from '@storybook/theming'
import { addons } from '@storybook/addons'
import Logo from './logo-lettering.svg'

const theme = create({
  base: 'light',

  // // Color palette
  // colorPrimary: '', // primary color
  colorSecondary: '#171f2c', // secondary color

  // // UI
  // appBg: '',
  // appContentBg: '',
  // appBorderColor: '',
  // appBorderRadius: 2,

  // // Fonts
  fontBase: '"Titillium Web", sans-serif',
  fontCode: 'Menlo, monospace',

  // // Text colors
  // textColor: '',
  // textInverseColor: '',

  // // Toolbar default and active colors
  // barTextColor: '',
  // barSelectedColor: '',
  // barBg: '',

  // // Form colors
  // inputBg: '',
  // inputBorder: '',
  // inputTextColor: '',
  // inputBorderRadius: 2,

  // Brand logo/text
  brandImage: Logo,
  brandTitle: 'datalith',
})

addons.setConfig({ theme })
