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
          module: {
            rules: [
                {
                    test: /.ts$/,
                    use: [
                        '@ngtools/webpack'
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
            new AotPlugin({
                tsConfigPath: helpers.root('tsconfig.json'),
                entryModule: helpers.root('./src/app/app.module#AppModule'),

            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                filename: "common.js",
                minChunks: Infinity
            }),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new ExtractTextPlugin({
                filename: "[name].css"
            }),
        ]
    });
};