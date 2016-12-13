const path = require('path'),
    webpack = require('webpack');
const conf = require('./config');


module.exports = {
    entry: {
        bundle: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 'babel-polyfill', conf.devEntry],

    },
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: "/js"
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
                test: require.resolve("babel-polyfill"),
                loader: "expose?babel-polyfill/dist/polyfill"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            }
        ]
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: '#eval-source-map',
};