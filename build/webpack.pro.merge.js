const path = require('path'),
    webpack = require('webpack');
const conf = require('./config');


module.exports = {
    entry: ['babel-polyfill', conf.proEntry],
    output: {
        path: conf.proOutput,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    name: 'imgs/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            }
        ]
    },
    resolve: {
        alias: conf.proPackage
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./../manifest.json')
        }),
    ],
    devtool: false,
    watch: true
};