var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  gulp.src('./www/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', handleError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./www/js/main.js'])
    .pipe(browserified)
    //.pipe(uglify('site.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch('./www/js/*.js', ['scripts']);
  gulp.watch('./www/scss/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'scripts', 'sass']);

function handleError(error) {
  console.log("[ERROR] " + error.plugin + ": " + error.message);
}
