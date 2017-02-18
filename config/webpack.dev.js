'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {AotPlugin} = require('@ngtools/webpack')
var CompressionPlugin = require("compression-webpack-plugin");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = function(options){
    return webpackMerge(commonConfig, {
         devtool: 'eval-source-map',
         module: {
            rules: [
                {
                    test: /.ts$/,
                    use: [
                        'angular2-template-loader',
                        'awesome-typescript-loader'
                    ],
                },
                {
                    test: /\.html$/,
                    use: [
                        'html-loader'
                    ]
                }
            ]
        },
         plugins: [
        new webpack.LoaderOptionsPlugin({
             minimize: true,
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                htmlLoader: {
                    minimize: false
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: "[name].css"
        })
    ],
    });
};