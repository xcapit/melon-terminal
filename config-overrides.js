const path = require('path');
const webpack = require('webpack');
const {
  override,
  addBabelPlugin,
  disableEsLint,
  addWebpackPlugin,
  addWebpackModuleRule,
  addWebpackAlias,
} = require('customize-cra');
const addHotLoader = require('react-app-rewire-hot-loader');

module.exports = override(
  addHotLoader,
  disableEsLint(),
  addBabelPlugin(['styled-components', { ssr: false, displayName: true }]),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
  addWebpackPlugin(new webpack.IgnorePlugin(/^scrypt$/)),
  addWebpackPlugin(
    new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\\/]dist$/, new RegExp(`^\\./.*\\.js$`))
  ),
  addWebpackPlugin(
    new webpack.ContextReplacementPlugin(/graphql-language-service-utils[\\/]dist$/, new RegExp(`^\\./.*\\.js$`))
  ),
  addWebpackPlugin(
    new webpack.ContextReplacementPlugin(/graphql-language-service-parser[\\/]dist$/, new RegExp(`^\\./.*\\.js$`))
  ),
  addWebpackModuleRule({
    test: /\.(graphql|gql)$/,
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  })
);
