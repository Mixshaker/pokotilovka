"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    refresh = require('gulp-refresh'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');
    // concatCss = require('gulp-concat-css'),
    // rename = require('gulp-rename');
    // uncss = require('gulp-uncss'),
    // add = require('gulp-add');


gulp.task('scss', () => {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(autoprefixer({
            browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(refresh());
});

gulp.task('html', () => {
  return gulp.src('./dist/*.html')
    .pipe(refresh());
});

gulp.task('scripts', () => {
  return gulp.src(['./js/jquery.min.js', './js/bootstrap.min.js'])
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