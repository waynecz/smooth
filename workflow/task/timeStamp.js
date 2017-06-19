module.exports = (gulp, common, path) => {
    gulp.task('ts', (cb) => {
        require(path.resolve(process.cwd(), './utils/editTimeStamp')).changeTimeStamp('./views/control/meta.html');
        require(path.resolve(process.cwd(), './utils/editTimeStamp')).changeTimeStamp('./views/screen/index.html');
        cb()
    });
};