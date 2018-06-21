var path = require('path');
var SRC = path.join(__dirname, '/client/src');
var DEST = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DEST
  },
  module: {
    loaders: [
      {
        exclude: ['node_modules'],
        loader: 'babel-loader',
        test: /\.jsx?$/
      },
      {
        test: /\.jsx?/,
        include: SRC,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
};