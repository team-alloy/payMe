require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

let SRC_DIR = path.join(__dirname, '/client/src');
let DEST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DEST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: ['node_modules'],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.join(__dirname, 'client/dist/index.html'),
      inject: 'body',
    }),
    new webpack.BannerPlugin('React Twilio'),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.HotModuleReplacementPlugin(),

  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  } 
};
