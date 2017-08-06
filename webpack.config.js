const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const projectConfig = require('./src/env-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const critical = require('critical');
const WebpackOnBuildPlugin = require('on-build-webpack');
const { execSync } = require('child_process');

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: isDev
              ? 'vue-style-loader!css-loader!sass-loader'
              : ExtractTextPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: 'css-loader!sass-loader'
                })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      isDev
        ? {
            test: /\.scss$/,
            loaders: 'style-loader!css-loader!sass-loader'
          }
        : {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
          }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port,
    quiet: true,
    hot: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map'
};

if (isDev) {
  config.plugins = [
    ...config.plugins,
    new webpack.NamedModulesPlugin(),
    new FriendlyErrors({
      compilationSuccessInfo: {
        messages: [
          `Application is running on ${chalk.bold.cyan(`http://localhost:${port}`)}`,
          ...Object.keys(projectConfig).map(key => `${key}: ${chalk.bold.cyan(projectConfig[key])}`)
        ]
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
} else {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(js|vue)/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [
        {
          loader: 'eslint-loader',
          options: {
            failOnError: true,
            rules: {
              'no-debugger': 2,
              'no-console': ['error', { allow: ['warn', 'error'] }]
            }
          }
        }
      ]
    }
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true
    }),
    new ProgressBarPlugin(),
    new WebpackOnBuildPlugin(() => {
      critical.generate(
        {
          base: 'dist/',
          src: 'index.html',
          dest: 'index.html',
          inline: true,
          minify: true,
          extract: true,
          penthouse: {
            blockJSRequests: false
          },
          dimensions: [
            { height: 400, width: 500 }, // small to large handset < 600px width
            { height: 700, width: 1000 }, // small to medium tablet 600px > < 1024px width
            { height: 900, width: 1300 }, // large tablet to laptop	1024px > < 1440px width
            { height: 1000, width: 1800 }, // desktop	1440px > < 1920px width
            { height: 1200, width: 2000 } // large 4k and ultra-wides
          ]
        },
        () => {
          fs.unlink(path.resolve(__dirname, './dist/style.css'), err => err && console.warn(err));
          fs.unlink(path.resolve(__dirname, './dist/style.css.map'), err => err && console.warn(err));
          const cssFile = fs.readdirSync('./dist').find(el => el.match(/\.css$/));
          execSync(`npx cssnano dist/${cssFile} dist/${cssFile}`);
        }
      );
    })
  ];
  if (process.env.NODE_ENV === 'analyze') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
}

module.exports = config;
