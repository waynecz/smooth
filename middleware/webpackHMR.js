/**
 * Webpack 热加载中间件
 */
const webpackConfig = require('../build/webpack.dev.js');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const compiler = webpack(webpackConfig);

// HMR配置
module.exports = {
    webpackDevMiddleware: devMiddleware(compiler, {
        hot: true,
        filename: 'app.js',
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        historyApiFallback: true,
        quiet: true
    }),
    webpackHotMiddleware: hotMiddleware(compiler, {
        log: () => {}
    })
};
