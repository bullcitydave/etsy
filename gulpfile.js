var gulp           = require('gulp'),
    connect        = require('gulp-connect'),
    csso           = require('gulp-csso'),
    sass           = require('gulp-sass'),
    rename         = require("gulp-rename");
    deploy         = require("gulp-gh-pages");

// Styles.
gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(
      sass( {
        includePaths: ['src/styles'],
        errLogToConsole: true
      }))
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'))
    .pipe(connect.reload());
});

// Javascript
gulp.task('js', function() {
  return gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

// Data
gulp.task('data', function() {
  return gulp.src('src/data/**/*')
    .pipe(gulp.dest('dist/data/'))
    .pipe(connect.reload());
});

// Templates
gulp.task('templates', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Build
gulp.task('build', ['images','styles','templates', 'js', 'data']);

// Connect - let's get this party started!
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 9000,
    livereload: true
  });
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/**/*.html', ['templates']);
    gulp.watch('src/js/**/*.js', ['js']);
});

// Default task
gulp.task('default', function() {
    gulp.start('build', 'connect', 'watch');
});

// Deploy to gh-pages
gulp.task('deploy', function() {
  gulp.src("./dist/**/*")
    .pipe(deploy('git@github.com:bullcitydave/etsy.git', 'origin'));
});
