import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    require.resolve('../client/index.jsx'),
  ],
  output: { path: '/' },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /^((?!\/fonts\/).)*\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/template.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
