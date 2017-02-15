'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {AotPlugin} = require('@ngtools/webpack') 


module.exports = {
    devtool: 'source-map',
    context: helpers.root("./src"),
    entry: {
        polyfills: './polyfills.ts',
        vendor: './vendor.ts',
        app: "./main.ts"
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [helpers.root("./src"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: [
                    '@ngtools/webpack'
                    /*'angular2-template-loader',
                    'awesome-typescript-loader'*/
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ['raw-loader', 'sass-loader?sourceMap']
                    /*ExtractTextPlugin.extract({ fallback: 'style-loader', loader: [
                    'to-string-loader',
                    'css-loader'] }),*/
                    // 'to-string-loader',
                    // 'css-loader',
                    // 'sass-loader'
                
            }
        ]
    },
    output: {
        path: helpers.root("./dist"),
        filename: "[name].js",
    },
    plugins: [
         new AotPlugin({
            tsConfigPath: helpers.root('tsconfig.json'),
            entryModule: helpers.root('./src/main.ts')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity
        }),
        new CheckerPlugin(),
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
    ],
    devServer: {
        contentBase: helpers.root('./dist'),
        inline: true,
        port: 91  // New
    },
};