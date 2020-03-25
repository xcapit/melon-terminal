// @ts-ignore
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/preset-create-react-app', '@storybook/addon-viewport/register', '@storybook/addon-storysource'],
  webpackFinal: async (config: any) => {
    config.resolve.alias = Object.assign(config.resolve.alias || {}, {
      '~': path.resolve(process.cwd(), 'src'),
    });

    return config;
  },
};
