const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    DLLPath: path.resolve(process.cwd(), './public/js'),
    bundlePath: path.resolve(process.cwd(), './public/js'),
    entry: path.resolve(process.cwd(), './src/entry.js'),
    devDllPackage: [
        'vue/dist/vue.js',
        'vue-router/dist/vue-router.js',
        'axios/dist/axios.js'
    ],
    proDllPackage: [
        'vue/dist/vue.min.js',
        'vue-router/dist/vue-router.min.js',
        'axios/dist/axios.min.js'
    ],
    devPackage: {
        'vue$': 'vue/dist/vue.js',
        'vue-router': 'vue-router/dist/vue-router.js',
        'axios': 'axios/dist/axios.js'
    },
    proPackage: {
        'vue$': 'vue/dist/vue.min.js',
        'vue-router': 'vue-router/dist/vue-router.min.js',
        'axios': 'axios/dist/axios.min.js'
    },
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: ['vue-style-loader', 'css-loader', 'sass-loader']
                },
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
};
