/* ## gulpfile.js
 * Gulp build file.
 * Currently just moves and concatenates stuff.
 * No deploy/optimization stuff yet
 */

var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

gulp.task('default', function (cb) {
  runSequence('clean',[
    'build-js',
    'build-components',
    'build-images',
    'build-css',
    'build-html',
    'watch'],cb);
});

/* Delete everything in the public folder */
gulp.task('clean', function (cb) {
    return del(['www'], cb);
});

/* Copy images */
gulp.task('build-images', function () {
  gulp.src([
    'lib/img/*'
  ]).pipe(gulp.dest('www'));
});

/* Custom code concatenated */
gulp.task('build-js', function () {
  gulp.src([
    'lib/js/index.js'
  ]).pipe(concat('index.js'))
    .pipe(gulp.dest('www'))
    .pipe(livereload());
});

/* Dependency code */
gulp.task('build-components', function () {
  gulp.src([
  ]).pipe(concat('components.js'))
    .pipe(gulp.dest('www'));
});

/* Custom styling concatenated */
gulp.task('build-css', function () {
  gulp.src([
    'lib/css/*'
  ]).pipe(concat('index.css'))
    .pipe(gulp.dest('www'))
    .pipe(livereload());
});

/* Custom content */
gulp.task('build-html', function () {
  gulp.src([
    'lib/html/*'
  ])
    .pipe(gulp.dest('www'))
    .pipe(livereload());
});

/* Listen for changes to css, js, and html
 * Move to www and refresh the browser
 */
gulp.task('watch', function () {
  livereload.listen();
  watch ('lib/js/*.js', function () {gulp.start('build-js');});
  watch ('lib/css/*.css', function () {gulp.start('build-css');});
  watch ('lib/html/*.html', function () {gulp.start('build-html');});
});
