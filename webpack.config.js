var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var SCRIPTS_PATH = 'backend/static/scripts';
var TEMPLATES_PATH = 'backend/templates';


var config = {
  watch: true,
  entry: './frontend/index.jsx',
  output: {
    filename: 'bundle.[hash].min.js',
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
          plugins: ["transform-decorators-legacy"]
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
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: '../../templates/index.html',
      template: 'frontend/index.html'
    })
  ]
};

if(process.env.NODE_ENV === 'production'){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }))
  config.watch = false
}


module.exports = config
