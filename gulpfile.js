var gulp = require("gulp");
var minifyCSS = require("gulp-csso");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
const prettier = require("gulp-prettier");
const minify = require("gulp-minify");
const image = require("gulp-image");

var htmlmin = require("gulp-htmlmin");

gulp.task("minify", function() {
  return gulp.src("*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});

gulp.task("image", function () {
  gulp.src("./media/thumbs_Ori_size/*")
    .pipe(image())
    .pipe(gulp.dest("./media/thumbs"));
});

gulp.task("pretty", function(){
  return gulp.src("js/app.js")
    .pipe(prettier({ singleQuote: false }))
    .pipe(gulp.dest("dist/"))
});

gulp.task("compress", function() {
  gulp.src(["js/app.js"])
    .pipe(minify())
    .pipe(gulp.dest("dist"))
});

gulp.task("css", function(){
  return gulp.src(["vendor/bootstrap/css/bootstrap.min.css", "css/404.css", "css/*.css"])
    .pipe(minifyCSS())
    .pipe(concat("app.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css"))
});

gulp.task("js", function(){
  return gulp.src(["js/mapbox-gl-directions.js", "js/rrssb.min.js", "dist/app-min.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js"))	
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/js"))
});

gulp.task("default", [ "minify", "pretty", "compress", "css", "js", "image"]);
