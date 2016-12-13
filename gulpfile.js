var gulp = require('gulp');
var shell = require('gulp-shell');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var maps = require('gulp-sourcemaps');
require('colors');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var processors = [
    autoprefixer({browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]})
];
var APP = path.resolve(__dirname, 'app.js');
var ROUTERS = path.resolve(__dirname, 'routes');
var VIEW = path.resolve(__dirname, 'views/**');
var UTILS = path.resolve(__dirname, 'utils/*.js');


gulp.task('reload', shell.task([
    'pm2 reload all'
]));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('css:dev', () => {
    return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(maps.write())
        .pipe(gulp.dest(path.resolve(__dirname, 'public/css/')));
});

gulp.task('css:pro', () => {
    return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.resolve(__dirname, 'public/css/')));
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('watch:node', (cb) => {
    gulp.watch(['./routes/**/*.js', './app.js', './bin/www', './views/**/*.html', './utils/*.js'],
        gulp.parallel('reload')
    );
    cb()
});

gulp.task('watch:css', (cb) => {
    gulp.watch(path.resolve(__dirname, 'src/sass/**'),
        gulp.parallel('css:dev', 'css:pro')
    );
    cb()
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('img', (cb) => {
        gulp.src('./src/img/*.*')
            .pipe(imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            }))
            .pipe(gulp.dest(path.join(__dirname, './public/imgs')))

        cb()
    }
);

gulp.task('sp', () => {
    gulp.src('./public/css/*.css')
        .pipe(sprite({slicePath: '../slice', }))
        .pipe(gulpif('*.png', gulp.dest('./public/sprite/'), gulp.dest('./public/css/')));
    return Promise.resolve()
});

gulp.task('ts', (cb) => {
    require('./utils/editTimeStamp').changeTimeStamp('./views/control/meta.html');
    require('./utils/editTimeStamp').changeTimeStamp('./views/screen/index.html');
    cb()
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('dev',
    gulp.series('css:dev',
        gulp.parallel('watch:node', 'watch:css')
    )
);

gulp.task('prod',
    gulp.parallel('ts')
);