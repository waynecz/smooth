/**
 * Dll 库打包
 */
const webpack = require('webpack');
const conf = require('./config');

let vendors = conf.proDllPackage;

DllPackConfig = {
    entry: {
        "lib": vendors
    },
    output: {
        path: conf.proDllDist,
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname
        })
    ]
};


module.exports = DllPackConfig;