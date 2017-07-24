const gulp = require('gulp');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');

gulp.task('uglify',() => {
    gulp.src(['./public/javascripts/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.watch('./public/javascripts/*.js',['uglify']);

gulp.task('default',[
  'uglify',
  'watch',
]);
