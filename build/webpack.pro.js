const path                 = require('path');
const webpack              = require('webpack');
const conf                 = require('./config');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin    = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rules = conf.rules;

Object.assign(rules[0].options, {
    loaders: {
        css: ['vue-style-loader', 'css-loader'],
        postcss: ['vue-style-loader', 'css-loader'],
        less: ['vue-style-loader', 'css-loader', 'less-loader'],
        sass: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
        scss: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'vue-style-loader'
        }),
    },
    postcss: [
        require('autoprefixer')({
            browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 9"]
        })
    ]
});

module.exports = {
    entry: {
        app: [conf.entry]
    },
    output: {
        path: conf.bundlePath,
        filename: '[name].js',
    },
    module: {
        rules: rules
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
            filename: '../css/style.[chunkhash].css'
        }),
        new OptimizeCSSPlugin(),
        // new BundleAnalyzerPlugin()
        // 如果要启用分析请打开上面的注释
    ],
    devtool: false,
};