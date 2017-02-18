'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {AotPlugin} = require('@ngtools/webpack')
var CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
    // devtool: 'source-map',
    //context: helpers.root("./src"),
    entry: {
        polyfills: './src/polyfills.ts',
        // vendor: './src/vendor.ts',
        main: "./src/main.ts"
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [helpers.root("./src"), "node_modules"]
    },
    output: {
        path: helpers.root("./dist"),
        filename: "[name].js",
    },
   
    devServer: {
        contentBase: helpers.root('./dist'),
        inline: true,
        port: 91  // New
    },
};