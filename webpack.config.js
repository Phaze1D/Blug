var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var SCRIPTS_PATH = 'backend/static/scripts';
var TEMPLATES_PATH = 'backend/templates';

module.exports = {
  watch: true,
  entry: './frontend/src/index.jsx',
  output: {
    filename: 'bundle.min.js',
    publicPath: '/static/scripts/',
    path: SCRIPTS_PATH
  },
  resolve: {
    modules: [
      'node_modules',
      'frontend'
    ],
    extensions: ['.js', '.jsx', '.scss', '.sass']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}], 'react', 'stage-0'],
        }
      }]
    },{
      test: /\.sass$/,
      loaders: [
        'style-loader',
        'css-loader',
        { loader: 'sass-loader', query: { outputStyle: 'expanded' } }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin([SCRIPTS_PATH, TEMPLATES_PATH]),
    // new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: '../../templates/index.html',
      template: 'frontend/src/index.html'
    })
  ]
};
