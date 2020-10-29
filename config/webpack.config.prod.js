const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: { children: false,warnings:false },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: false
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true
        },
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  },
})

module.exports = webpackConfig