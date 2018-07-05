require('dotenv').config();
const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DEST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DEST_DIR,
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: ['node_modules'],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx','.json']
  },
  node: {
    fs: 'empty',
  }
};
