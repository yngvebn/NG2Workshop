'use strict';

const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./build/webpack.common');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;

module.exports = function makeWebpackConfig(options) {
  let config = Object.assign({}, commonConfig(webpack, options, __dirname));

  var localConfig = Object.assign({
    server: {
      baseUrl: 'https://bugs.mftdev.com'
    }
  }, getLocalConfig());

  /*
   * Webpack Constants
   */
  const METADATA = {
    title: 'Course Arranger | Mindflash Training Management System',
    baseUrl: '.',
    env: ENV
  };

  config.devtool = 'eval-source-map';

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    'mfa-polyfills': './src/polyfills.ts',
    'mfa-vendor': './src/vendor.dev.ts',
    'mfa-app': './src/main.dev.ts' // our angular app
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = Object.assign({}, commonConfig.output, {
    path: root('dist'),
    publicPath: 'http://localhost:9090/',
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  });

  config.module.rules.push(
    // Support for .ts files.
    {
      test: /\.ts$/,
      loaders: [`awesome-typescript-loader?useCache=true`, 'angular2-template-loader', '@angularclass/hmr-loader'],
      exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    },

    // Support for CSS as raw text
    // use 'null' loader in test mode (https://github.com/webpack/null-loader)
    // all css in src/style will be bundled in an external css file
    {
      test: /\.css$/,
      exclude: root('src', 'app'),
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', 'postcss-loader']
      })
    },

    // all css required in src/app files will be merged in js files
    {test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader'},

    // support for .scss files
    // use 'null' loader in test mode (https://github.com/webpack/null-loader)
    // all css in src/style will be bundled in an external css file
    {
      test: /\.scss$/,
      exclude: root('src', 'app'),
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', 'postcss-loader', 'sass-loader']
      })
    },
    // all css required in src/app files will be merged in js files
    {test: /\.scss$/, exclude: root('src', 'style'), loader: 'raw-loader!postcss-loader!sass-loader'}
  );

  config.plugins.push(
    new DashboardPlugin(),
    new ForkCheckerPlugin(),
    // Generate common chunks if necessary
    // Reference: https://webpack.github.io/docs/code-splitting.html
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: ['mfa-vendor', 'mfa-polyfills']
    }),
    // Inject script and link tags into html files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(Object.assign({
      template: './src/public/index.html',
      chunksSortMode: 'dependency'
    }, METADATA)),

    // Extract css files
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: true
    })
  );

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    setup: (app) => {
      app.get('/TrainerM/trainer-arranger-config', (req, res) => {
        res.redirect(`${localConfig.server.baseUrl}/TrainerM/trainer-arranger-config`);
      });

      app.use('/[0-9]+\/css/', require('serve-static')(`${__dirname}/src/public/css`));

      app.use('/[0-9]+\/img/', require('serve-static')(`${__dirname}/src/public/img`));

      app.use('/[0-9]+\/js/', require('serve-static')(`${__dirname}/src/public/js`));
    },
    contentBase: './src/public',
    historyApiFallback: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    proxy: {
      '/mm/course-content': {
        target: localConfig.server.baseUrl, // need to change to your url
        secure: false
      },
      '/mm/cs': {
        target: localConfig.server.baseUrl,
        secure: false
      },
      '/socket.io': {
        target: localConfig.server.baseUrl,
        secure: false
      }
    }
  };

  return config;
};

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function getLocalConfig() {
  try {
    require.resolve('./local.js');
  } catch (e) {
    return {};
  }

  return require('./local.js');
}