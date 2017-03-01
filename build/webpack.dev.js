const path    = require('path'),
      webpack = require('webpack');
const conf    = require('./config');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', conf.entry],
    },
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: "/js"
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
        new FriendlyErrorsWebpackPlugin(),
    ],
    devtool: '#eval-source-map',
};