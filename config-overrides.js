const hot = require('react-app-rewire-hot-loader')
const webpack = require('webpack');

module.exports = function override(config, env) {
  config = hot(config, env);
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
  };

  config.plugins.push(new webpack.IgnorePlugin(/^scrypt$/))

  return config;
};
