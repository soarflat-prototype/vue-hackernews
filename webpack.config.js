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
        presets: ['env'],
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
    }]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    }
  }
};