const path    = require('path'),
      webpack = require('webpack');
const conf    = require('./config');

module.exports = {
    entry: {
        app: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', conf.entry],
    },
    output: {
        path: '/',
        filename: '[name].js',
        publicPath: "/js"
    },
    module: {
        rules: conf.rules
    },
    resolve: {
        alias: conf.devPackage
    },
    plugins: [
        new webpack.DefinePlugin({
            environment: JSON.stringify('dev')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./../manifest.json')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devtool: '#eval-source-map',
};