/**
 * Dll 库打包
 */
const webpack = require('webpack');
const conf = require('./config');

let vendors = conf.devDllPackage;

DllPackConfig = {
    entry: {
        "lib": vendors
    },
    output: {
        path: conf.dllDist,
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname
        })
    ]
};


module.exports = DllPackConfig;