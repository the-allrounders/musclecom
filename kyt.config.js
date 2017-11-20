/* eslint-disable */
// Base kyt config.
// Edit these properties to make changes.
const webpack = require('webpack');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

module.exports = {
  reactHotLoader: true,
  debug: false,
  hasServer: true,
  modifyWebpackConfig: (baseConfig) => {

    /**
     * Add some globals, so they can be used in every script like they were provided by javascript.
     */
    baseConfig.plugins.push(new webpack.DefinePlugin(GLOBALS));

    /**
     * Add support for the .jsx extension
     */
    baseConfig.resolve.extensions.push('.jsx');

    /**
     * Load all .svg files as a React component
     */
    const svgFileThatIsNotAFont = /^((?!\/fonts\/).)*\.svg$/;
    const babelLoader = baseConfig.module.rules.find(r => r.loader === 'babel-loader');
    baseConfig.module.rules.unshift({
      test: svgFileThatIsNotAFont,
      use: [
        {loader: babelLoader.loader, options: babelLoader.options },
        {loader: 'react-svg-loader'},
      ]
    });
    baseConfig.module.rules.find(r => r.loader === 'file-loader').exclude = svgFileThatIsNotAFont;

    return baseConfig;
  },
};
