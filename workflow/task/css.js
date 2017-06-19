const autoprefixer = require('autoprefixer');

const processors = [
    autoprefixer({browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]})
];

module.exports = (gulp, common, path) => {
    gulp.task('css:dev', () => {
        return gulp.src(path.resolve(__dirname, 'src/sass/index.scss'))
            .pipe(common.plugins.maps.init())
            .pipe(common.plugins.sass({outputStyle: 'compact'}).on('error', common.plugins.sass.logError))
            .pipe(common.plugins.maps.write())
            .pipe(gulp.dest(path.resolve(__dirname, 'public/css/')));
    });
    gulp.task('css:pro', () => {
        return gulp.src(path.resolve(__dirname, 'src/sass/index.scss'))
            .pipe(common.plugins.sass({outputStyle: 'compressed'}).on('error', common.plugins.sass.logError))
            .pipe(common.plugins.postcss(processors))
            .pipe(gulp.dest(path.resolve(__dirname, 'public/css/')));
    });
};

