var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var premailer = require('gulp-premailer');
 
// Compile our sass
gulp.task('sass', function() {
  return sass('src/app/stylesheets')
    .pipe(gulp.dest('src/app/stylesheets'));
});

// Minify our images
gulp.task('imagemin', function () {
    return gulp.src('src/app/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dev/images'));
});

gulp.task('premailer', function () {
    gulp.src('src/*.html')
        .pipe(premailer())
        .pipe(gulp.dest('dev'));
});

gulp.task('default', function() {
  gulp.start('sass', 'imagemin', 'premailer');
});