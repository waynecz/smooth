const path                 = require('path');
const webpack              = require('webpack');
const conf                 = require('./config');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin    = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: conf.entry,
    output: {
        path: conf.bundlePath,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['vue-style-loader', 'css-loader'],
                        postcss: ['vue-style-loader', 'css-loader'],
                        less: ['vue-style-loader', 'css-loader', 'less-loader'],
                        sass: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
                        scss: ['vue-style-loader', 'css-loader', 'sass-loader']
                    },
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'imgs/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            }
        ]
    },
    resolve: {
        alias: conf.proPackage
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./../manifest.json')
        }),
        new ExtractTextPlugin({
            filename: './css/style.[contenthash].css'
        }),
        new OptimizeCSSPlugin(),
        // new BundleAnalyzerPlugin()
        // 如果要启用分析请打开上面的注释
    ],
    devtool: false,
};