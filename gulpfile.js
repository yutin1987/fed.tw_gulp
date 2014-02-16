var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    through2 = require('through2'),
    clean = require('gulp-clean');

process.on('uncaughtException', function (err) {
    console.error(err);
    var tasks = process.argv.slice(2);
    tasks.length || tasks.push('default');
    gulp.start.apply(gulp, tasks);
});

paths = {
    src: 'src',
    dest: 'build'
}


gulp.task('grandfather', function(){
    return gulp.src('*')
               .pipe(through2.obj(function(file, enc, cb){
                    setTimeout(cb, 1000);
                    // console.log("I'm Mom");
               }));
});

gulp.task('mon', ['grandfather'], function(){
    return gulp.src('*')
               .pipe(through2.obj(function(file, enc, cb){
                    setTimeout(cb, 500);
                    // console.log("I'm Mom");
               }));
});

gulp.task('dad', function(){
    return gulp.src('*')
               .pipe(through2.obj(function(file, enc, cb){
                    setTimeout(cb, 500);
                    // console.log("I'm Dad");
               }));
});

gulp.task('me', ['mon', 'dad'], function(){
    return gulp.src('*')
               .pipe(through2.obj(function(file, enc, cb){
                    setTimeout(cb, 200);
                    // console.log("I'm Me");
               }));
});

gulp.task('default', ['me']);