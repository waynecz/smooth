module.exports = (gulp, common, path) => {
    function resolvePath(pwd) {
        return path.resolve(process.cwd(), pwd)
    }

    gulp.task('reload', common.plugins.shell.task([
        'pm2 reload all'
    ]));

    gulp.task('watch:node', (cb) => {
        gulp.watch(
            [
                resolvePath('./routes/**/*.js'),
                resolvePath('./app.js'),
                resolvePath('./bin/www'),
                resolvePath('./views/**/*.html'),
                resolvePath('./utils/*.js'),
                resolvePath('./mock/**')
            ],
            gulp.parallel('reload')
        );
        cb()
    });

    gulp.task('watch:css', (cb) => {
        gulp.watch(resolvePath('src/sass/**'),
            gulp.parallel('css:dev', 'css:pro')
        );
        cb()
    });
};