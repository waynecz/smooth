const gulp   = require('gulp');
const fs     = require('fs');
const path   = require('path');
const common = require('./workflow/common');

const taskPath = 'workflow/task';

// 任务载入
fs.readdirSync(taskPath).filter(_file => {
    return _file.match(/js$/);
}).forEach(_file => {
    require(`./${taskPath}/${_file}`)(gulp, common, path);
});

gulp.task('dev',
    gulp.parallel('watch:node')
);

gulp.task('p',
    gulp.parallel('ts')
);