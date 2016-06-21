var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  reporter = require('postcss-reporter'),
  cssnext = require('postcss-cssnext');

gulp.task('styles', function () {
  var processors = [
    cssnext({browsers: ['last 2 versions']}),
    cssnano(),
    reporter()
  ];
  return gulp.src(['./assets/css/*.css', './assets/plugins/custom-google-map/ggl-map-main.css'])
    .pipe(concat('styles.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets/public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./assets/css/*.css', ['styles']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js handlebars coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'styles',
  'develop',
  'watch'
]);
