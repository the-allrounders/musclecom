import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    require.resolve('../client/index.jsx'),
  ],
  output: { path: '/' },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
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
