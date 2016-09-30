"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    refresh = require('gulp-refresh'),
    cleanCSS = require('gulp-clean-css');

// concatCss = require('gulp-concat-css'),
// concat = require('gulp-concat'),
// rename = require('gulp-rename'),
// uncss = require('gulp-uncss'),
// add = require('gulp-add'),


gulp.task('scss', () => {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(refresh());
});

gulp.task('html', () => {
  return gulp.src('./dist/*.html')
    .pipe(refresh());
});

gulp.task('scripts', () => {
  return gulp.src(['./js/bootstrap.min.js', './js/jquery.min.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(refresh());
});

gulp.task('watch', () => {
    refresh.listen()
    gulp.watch('./scss/*.scss', ['scss']);
    gulp.watch('./dist/*.html', ['html']);
    gulp.watch('./dist/js/*.js', ['scripts']);
});

gulp.task('default', ['html', 'scss', 'scripts', 'watch']);