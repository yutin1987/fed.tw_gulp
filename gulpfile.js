var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload');


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

gulp.task('stylus', function () {
    return gulp.src(paths.src + '/style/*.styl')
        .pipe(stylus({use: ['nib']}))
        .pipe(gulp.dest(paths.dest + '/style'));
});

gulp.task('jade', function () {
    return gulp.src(paths.src + '/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload());
});

gulp.task('copy', function() {
    return gulp.src([
                    paths.src +'/**/*.css',
                    paths.src +'/**/*.eot',
                    paths.src +'/**/*.svg',
                    paths.src +'/**/*.ttf',
                    paths.src +'/**/*.js',
                    paths.src +'/**/*.png'])
               .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
    var server = livereload();
    gulp.watch([paths.src +'/**/*.jade'], ['copy','stylus','jade']);
    gulp.watch(paths.dest + '*.html', function(evt) {
        server.changed(evt.path);
    });
});

gulp.task('default', ['copy','stylus','jade','watch']);