var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
const prettier = require('gulp-prettier');

gulp.task('pretty', function(){
  return gulp.src('js/app.js')
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('css', function(){
  return gulp.src(['vendor/bootstrap/css/bootstrap.min.css', 'css/404.css', 'css/*.css'])
    .pipe(minifyCSS())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', function(){
  return gulp.src(['js/mapbox-gl-directions.js','js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'css', 'js', 'pretty' ]);
