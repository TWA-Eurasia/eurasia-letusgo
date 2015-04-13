var gulp = require('gulp');

var less = require('gulp-less');
var jshint = require('gulp-jshint');
var checkstyleReporter = require('gulp-jshint-checkstyle-reporter');

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

gulp.task('jshint', function() {
  gulp.src(['router/**/*.js', 'public/**/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(checkstyleReporter())
    .pipe(gulp.dest('target/checkstyle-reports'));
});

gulp.task('default');
