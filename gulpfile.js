var gulp = require('gulp'),
    exec = require('gulp-exec'),
    ls = require('gulp-livescript'),
    fs = require('fs'),
    through2 = require('through2');


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
               .pipe(through2.obj(function(file, enc, cb){
                  fs.readFile(file.path, function(err, data){
                    var ver = /version\D+(\d\.\d\.\d)/i.exec(data.toString());
                    ver = ver[1].split('.');
                    ver[2] = parseInt(ver[2], 10) + 1;
                    var pk = data.toString().replace(/version\D+\d\.\d\.\d/i, 'version": "' + ver.join('.'));
                    fs.writeFile(file.path, pk, function(){
                        this.push(file);
                        cb();
                    }.bind(this));
                  }.bind(this))
               }))
               .pipe(exec('npm publish'));
});

gulp.task('default', ['publish']);