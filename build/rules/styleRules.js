/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 14:58:43
 * @LastEditTime: 2019-09-18 09:33:24
 * @LastEditors: Please set LastEditors
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./../config');
const { resolve } = require('./../utils');
const theme = require('./../../theme');
const { cacheLoader } = require('./loaders');

const cssLoader = modules => ({
  loader: 'css-loader',
  options: {
    modules: modules
      ? {
          mode: 'local',
          localIdentName: '[local]--[hash:base64:8]'
        }
      : false
  }
});

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [require('bourbon').includePaths, resolve('src/styles')]
  }
};

const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    modifyVars: theme
  }
};

const baseLoaders = modules => [
  config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
  cacheLoader,
  cssLoader(modules),
  'postcss-loader'
];

module.exports = [
  {
    test: /\.css$/,
    include: [resolve('node_modules')],
    use: baseLoaders(false)
  },
  {
    // for ant design
    test: /\.less$/,
    // https://github.com/webpack-contrib/thread-loader/issues/10
    use: [...baseLoaders(false), lessLoader]
  }
];
