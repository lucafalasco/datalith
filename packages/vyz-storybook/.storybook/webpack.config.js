const path = require('path')

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: {
            parser: 'typescript',
            prettierConfig: {
              printWidth: 100,
              semi: false,
              singleQuote: true,
              trailingComma: 'all',
            },
          },
        },
      ],
    },
  )
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
