'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
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
                    {
                        loader: 'angular2-template-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
        ]
    },
    output: {
        path: helpers.root("./dist"),
        filename: "[name].js",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity
        }),
        new CheckerPlugin()
    ],
    devServer: {
        contentBase: helpers.root('./dist'),
        inline: true,
        port: 91  // New
    },
};