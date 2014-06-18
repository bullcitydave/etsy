var gulp           = require('gulp'),
    csso           = require('gulp-csso'),
    sass           = require('gulp-sass'),
    rename         = require("gulp-rename"),
    connect        = require("gulp-connect");

// // Styles
gulp.task('css', function() {
  return gulp.src('src/css/*.scss')
    .pipe(
      sass( {
        includePaths: ['src/css'],
        errLogToConsole: true
      } ) )
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css/'));
});

// // Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./images/'));
});

// // Templates
gulp.task('templates', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('./'));
});
//
// // Build
gulp.task('build', ['images','css','templates']);

// Connect - let's get this party started!
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 9000
  });
});
//
// // Watch
// gulp.task('watch', function() {
//     // gulp.watch('src/css/*.css', ['styles']);
//     gulp.watch('src/css/*.*scss', ['css']);
//     // gulp.watch('src/css/*.css', ['styles']);
//     gulp.watch('src/images/**/*', ['images']);
//     gulp.watch('src/**/*.html', ['templates']);
// });
//
// // Default task
// gulp.task('default', function() {
//     gulp.start('build', 'connect', 'watch');
// });
