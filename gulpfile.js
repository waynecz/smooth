const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const common = require('./workflow/common');

const taskPath = 'workflow/task';

// 任务载入
fs.readdirSync(taskPath).filter(_file => {
    return _file.match(/js$/); // 排除非 JS 文件，如 Vim 临时文件
}).forEach(_file => {
    require(`./${taskPath}/${_file}`)(gulp, common, path);
});

gulp.task('dev',
    gulp.series('css:dev',
        gulp.parallel('watch:node', 'watch:css')
    )
);

gulp.task('prod',
    gulp.parallel('ts')
);