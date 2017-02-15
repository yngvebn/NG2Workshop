'use strict';

const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./build/webpack.common');

// Webpack Plugins
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
var isQA = process.env.env === 'qa';
var isProd = process.env.env === 'prod';

module.exports = function makeWebpackConfig(options) {
  let config = Object.assign({}, commonConfig(webpack, options, __dirname));

  /*
   * Webpack Constants
   */
  const METADATA = {
    title: 'Course Arranger | Mindflash Training Management System',
    baseUrl: '.',
    env: ENV
  };

  config.devtool = 'source-map';

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    'mfa-polyfills': './src/polyfills.ts',
    'mfa-vendor': './src/vendor.aot.ts',
    'mfa-app': './src/main.aot.ts' // our angular app
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = Object.assign({}, commonConfig.output, {
    path: root('dist'),
    publicPath: './',
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  });

  config.module.rules.push(
    // Support for .ts files.
    {
      test: /\.ts$/,
      loaders: ['@ngtools/webpack']
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
    new AotPlugin({
      tsConfigPath: path.join(__dirname, 'tsconfig.aot.json')
    }),
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
      disable: false
    }),
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    // new webpack.optimize.DedupePlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin({sourcemap: true, mangle: { keep_fnames: true }}),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: root('src/public')
    }])
  );

  if (isQA || isProd) {
    var arrangerConfig = require('mf-config').mfTrainerArranger;
    if (arrangerConfig.env !== 'test') {
      var deployConfig = require('mf-config').mfTrainerArranger.deploy;
      config.plugins.push(
        new CompressionPlugin({
          asset: '[file]',
          algorithm: 'gzip',
          test: /\.js$|\.css$/,
          threshold: 10240
        }),
        new S3Plugin({
          basePath: deployConfig.s3KeyPrefix,
          exclude: /.*\.html$/,
          htmlFiles: ['index.html'],
          s3Options: {
            include: /.*\.(css|js)/,
            accessKeyId: deployConfig.accessKeyId,
            secretAccessKey: deployConfig.secretAccessKey,
            maxRetries: 10,
            region: deployConfig.s3Region
          },
          s3UploadOptions: {
            ACL: 'public-read',
            Bucket: deployConfig.s3Bucket,
            ContentEncoding: 'gzip',
            /**
             * @return {string}
             */
            ContentType(fileName) {
              if (/\.js/.test(fileName)) {
                return 'application/javascript';
              }

              if (/\.css/.test(fileName)) {
                return 'text/css';
              }

              return 'text/plain';
            }
          },
          cdnizerOptions: {
            allowMin: false,
            allowRev: false,
            defaultCDNBase: deployConfig.cloudfrontCodeUrl
          }
        })
      );
    }
  }

  return config;
};

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}