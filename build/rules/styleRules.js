const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./../config');
const { resolve } = require('./../utils');
const theme = require('./../../theme');
const { cacheLoader } = require('./loaders');

module.exports = [
  {
    //CSS处理
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      "style-loader",
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }
    ]
  },
  {
    test: /\.css$/,
    exclude: /src/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        }
      }
    ]
  },
  {
    test: new RegExp(`^(.*\\.global).*\\.less`),
    exclude: [/node_modules/],
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: theme,
          importLoaders: 1,
          modules: true
        }
      }
    ]
  },
  {
    test: new RegExp(`^(?!.*\\.global).*\\.less`),
    exclude: [/node_modules/],
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
        }
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: theme,
          importLoaders: 1,
          modules: true
        }
      }
    ]
  }
];
