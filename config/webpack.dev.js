'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  context: helpers.root("./src"),
  entry: {
    app: "./main.ts",
    polyfills: './polyfills.ts',
    vendor: './vendor.ts'
  },
  resolve: {
      extensions: ['.js', '.ts'],
    modules: [helpers.root("./src"), "node_modules"]
  },
  module: {
     
      rules: [
          { 
              test: /.ts$/,
              use: [{
                  loader: 'awesome-typescript-loader'
              }]
          }
      ]
  },
  output: {
    path: helpers.root("./dist"),
    filename: "[name].js",
  },
   plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: 2,
    }),
    new CheckerPlugin()
  ],
  devServer: {
    contentBase:  helpers.root("./dist"),  // New
  },
};