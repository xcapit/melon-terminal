const path = require('path');
const hot = require('react-app-rewire-hot-loader');
const webpack = require('webpack');

const flatten = (array) => array.reduce((a, b) =>
  a.concat(Array.isArray(b) ? flatten(b) : b), []);

module.exports = function override(config, env) {
  config = hot(config, env);

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
  };

  config.plugins.push(
    new webpack.IgnorePlugin(/^scrypt$/),
    new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\\/]dist$/, new RegExp(`^\\./.*\\.js$`)),
    new webpack.ContextReplacementPlugin(/graphql-language-service-utils[\\/]dist$/, new RegExp(`^\\./.*\\.js$`)),
    new webpack.ContextReplacementPlugin(/graphql-language-service-parser[\\/]dist$/, new RegExp(`^\\./.*\\.js$`))
  );

  // Remove typechecks during development.
  if (process.env.NODE_ENV === 'development') {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin';
    });
  }

  const rulesFlat = flatten(config.module.rules.map((rule) => rule.oneOf || rule));
  const fileLoader = rulesFlat.find((rule) => rule.loader && rule.loader.indexOf("file-loader") !== -1);

  // Load graphql files with graphql-tag instead of the file-loader.
  fileLoader && fileLoader.exclude.push(/\.(graphql|gql)$/);
  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    // Only target files from the renderer.
    include: path.resolve(__dirname, 'src'),
    loader: 'graphql-tag/loader',
  });

  return config;
};
