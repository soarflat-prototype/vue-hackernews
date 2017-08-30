const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'static/'),
    publicPath: '/static/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }, {
      enforce: 'pre',
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
    }],
  },
};