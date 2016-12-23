'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");

module.exports = {
  context: helpers.root("./src"),
  entry: {
    app: "./main.ts",
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
  ],
  devServer: {
    contentBase:  helpers.root("./dist"),  // New
  },
};