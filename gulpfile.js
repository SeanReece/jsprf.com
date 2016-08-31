const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const webserver = require('gulp-webserver')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('default', ['concat', 'watch', 'webserver'])
gulp.task('release', ['concat', 'compress'])

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('concat', function () {
    gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('jsprf.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

gulp.task('compress', function () {
    gulp.src('dist/jsprf.min.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['compress'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});
