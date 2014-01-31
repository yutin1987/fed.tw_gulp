var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    clean = require('gulp-clean');

paths = {
  src: 'src',
  dest: 'build'
}

gulp.task('script_clean', function() {
  return gulp.src([paths.dest + '/*.js', paths.dest + '/**/*.js'], {read: false})
             .pipe(clean());
});
gulp.task('script', ['script_clean'], function() {
  return gulp.src([paths.src + '/*.js', paths.src + '/**/*.js'])
             .pipe(gulp.dest(paths.dest));
});

gulp.task('html_clean', function() {
  return gulp.src([paths.dest + '/*.html', paths.dest + '/**/*.html'], {read: false})
             .pipe(clean());
});
gulp.task('jade', ['html_clean'], function() {
  return gulp.src([paths.src + '/*.jade', paths.src + '/**/*.jade'])
             .pipe(jade())
             .pipe(gulp.dest(paths.dest));
});

gulp.task('style_clean', function() {
  return gulp.src([paths.dest + '/*.css', paths.dest + '/**/*.css'], {read: false})
             .pipe(clean());
});
gulp.task('stylus', ['style_clean'], function() {
  return gulp.src([paths.src + '/*.styl', paths.src + '/**/*.styl'])
             .pipe(stylus())
             .pipe(gulp.dest(paths.dest));
});
gulp.task('style', ['style_clean'], function() {
  return gulp.src([paths.src + '/*.css', paths.src + '/**/*.css'])
             .pipe(gulp.dest(paths.dest));
});

gulp.task('fonts', function() {
  return gulp.src([paths.src + '/fonts/*'])
             .pipe(gulp.dest(paths.dest + '/fonts/'));
});

gulp.task('watch', function () {
  gulp.watch([paths.src + '/*.js', paths.src + '/**/*.js'], ['script']);
  gulp.watch([paths.src + '/*.jade', paths.src + '/**/*.jade'], ['jade']);
  gulp.watch([
    paths.src + '/*.styl', paths.src + '/**/*.styl',
    paths.src + '/*.css', paths.src + '/**/*.css'
    ], ['stylus','style']);
});

// // The default task (called when you run `gulp` from cli)
gulp.task('default', ['script','jade','stylus','style','fonts','watch']);