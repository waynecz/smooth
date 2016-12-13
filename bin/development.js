var path = require('path')
var projectRootPath = path.resolve(__dirname, '..')

var APP = path.resolve(projectRootPath, 'app.js');
var ROUTERS = path.resolve(projectRootPath, 'routes');
var VIEW = path.resolve(projectRootPath, 'views/**');
var UTILS = path.resolve(projectRootPath, 'utils/*.js');

var appPath = path.join(projectRootPath, 'app')
var fs = require('fs')
var debug = require('debug')('dev')
require('colors')

var log = console.log.bind(console, '>>> [DEV]:'.red)
var chokidar = require('chokidar')
var watcher = chokidar.watch([APP, ROUTERS, VIEW, UTILS])

watcher.on('ready', function () {
	require('./www') // start app
	log('♪ App Started'.green);

	watcher
		.on('add', function (absPath) {
			cacheClean()
		})
		.on('change', function (absPath) {
			console.error(absPath);
			cacheClean()
		})
		.on('unlink', function (absPath) {
			cacheClean()
		})
})

function cacheClean () {
	Object.keys(require.cache).forEach(function (id) {
		if (/[\/\\](app)[\/\\]/.test(id)) {
			console.log(require.cache[id] + '<<<<<<<<<<<')
			delete require.cache[id]
		}
	})
	log('♬ App Cache Cleaned...'.green)
}

process.on('exit', function (e) {
	log(' ♫ App Quit'.green)
})