const path = require('path');
const projectRootPath = path.resolve(__dirname, '..');

const APP = path.resolve(projectRootPath, 'koa.js');
const ROUTERS = path.resolve(projectRootPath, 'routes');
const VIEW = path.resolve(projectRootPath, 'views/**');
const UTILS = path.resolve(projectRootPath, 'utils/*.js');

const appPath = path.join(projectRootPath, 'app');
const fs = require('fs');
const debug = require('debug')('dev');
require('colors');

const log = console.log.bind(console, '>>> [DEV]:'.red);
const chokidar = require('chokidar');
const watcher = chokidar.watch([APP, ROUTERS, VIEW, UTILS]);

watcher.on('ready', function () {
	require('../koa'); // start app
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
});

function cacheClean () {
	Object.keys(require.cache).forEach(function (id) {
		if (/[\/\\](app)[\/\\]/.test(id)) {
			console.log(require.cache[id] + '<<<<<<<<<<<');
			delete require.cache[id]
		}
	});
	log('♬ App Cache Cleaned...'.green)
}

process.on('exit', function (e) {
	log(' ♫ App Quit'.green)
});