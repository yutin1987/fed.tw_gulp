var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    cssmin = require('gulp-minify-css');


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

gulp.task('cleancss', function(){
    return gulp.src([paths.dest + '/style/*.css', paths.temp + '/style/*.css'])
               .pipe(clean());
});

gulp.task('sass', ['cleancss'], function () {
    return gulp.src(paths.src + '/style/*.sass')
        .pipe(compass({
            css: 'src/css',
            sass: 'src/style',
            image: 'src/images'
            // logging: false
        }))
        .pipe(gulp.dest(paths.temp + '/style'));
});

gulp.task('stylus', ['cleancss'], function () {
    return gulp.src(paths.src + '/style/*.styl')
        .pipe(stylus({use: ['nib']}))
        .pipe(gulp.dest(paths.temp + '/style'));
});

gulp.task('css', ['sass', 'stylus'], function(){
    return gulp.src(paths.temp + '/style/*.css')
        .pipe(concat("all.css"))
        .pipe(gulp.dest(paths.dest + '/style/'))
});

gulp.task('cssmin', ['css'], function(){
    return gulp.src(paths.dest + '/style/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dest + '/style/'))
});

gulp.task('rev', ['cssmin'], function () {
    return gulp.src(paths.dest + '/style/*.css')
        .pipe(rev())
        .pipe(gulp.dest(paths.dest + '/style'));
});

gulp.task('default', ['css']);
gulp.task('build', ['rev']);