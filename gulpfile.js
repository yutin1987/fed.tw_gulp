var gulp = require('gulp'),
    exec = require('gulp-exec'),
    ls = require('gulp-livescript');


process.on('uncaughtException', function (err) {
    console.error(err);
    var tasks = process.argv.slice(2);
    tasks.length || tasks.push('default');
    gulp.start.apply(gulp, tasks);
});

paths = {
    src: 'src',
    temp: 'temp',
    dest: 'build'
}

gulp.task('ls', function() {
    return gulp.src(paths.src + '/*.ls')
            .pipe(ls({bare: true}))
            .pipe(gulp.dest('./'));
});

gulp.task('publish', ['ls'], function() {
    return gulp.src('package.json', {read: false})
               .pipe(exec('npm publish'));
});

gulp.task('default', ['publish']);