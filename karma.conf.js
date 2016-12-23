const helpers = require('./config/helpers');
const webpackConfig = require('./config/webpack.dev');

module.exports = function (config) {
    config.set({
        basePath: helpers.root(),
        frameworks: ['jasmine'],
        files: [ { pattern: './config/spec-bundle.js', watched: false } ],
        preprocessors: { './config/spec-bundle.js': ['webpack'] },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module,
        },     
        webpackMiddleware: { stats: 'errors-only'},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}