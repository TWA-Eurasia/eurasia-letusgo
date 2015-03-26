var gulp = require('gulp');

var less = require('gulp-less');


var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('lessCompiler', function () {

  gulp.src('public/style/*.less')
    .pipe(less())
    .pipe(gulp.dest('.tmp/style'))

});

gulp.task('serve', ['lessCompiler'], function () {

  gulp.watch([
    'public/style/*.less'
  ]).on('change', reload);

  gulp.watch('public/style/*.less', ['lessCompiler', reload]);

});

gulp.task('default');
