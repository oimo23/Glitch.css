'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require("browser-sync");

gulp.task('sass', function(){
  gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
  gulp.watch('./sass/**/*.scss', ['sass']);
})

gulp.task('browserSync', () => {
  browserSync.init({
    port: conf.port,
    ui: { port: conf.uiPort },
    server: './'
  });
});

gulp.task('default',['watch']);
