/**
 * Created by cshlovjah on 16.01.18.
 */
/**
 * Created by cshlovjah on 18.12.17.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

const minifyHtml = require('gulp-minify-html');

var filesize = require('gulp-filesize');

gulp.task('css', function () {
    gulp.src([
            'public/src/css/icon.css',
            'public/src/js/framework/plugins/bootstrap/css/bootstrap.css',
            'public/src/css/materialize.css',
            'public/src/js/framework/plugins/node-waves/waves.css',
            'public/src/js/framework/plugins/animate-css/animate.css',
            'public/src/css/style.css',
            'public/src/css/themes/all-themes.css'
        ])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(filesize())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('login-js', function () {
    gulp.src([
            'public/src/js/framework/plugins/jquery/jquery.js',
            'public/src/js/framework/plugins/bootstrap/js/bootstrap.js',
            'public/src/js/framework/plugins/node-waves/waves.js',
            'public/src/js/framework/plugins/jquery-validation/jquery.validate.js',
            'public/src/static/lib/admin.js',
            'public/src/static/login/signin.js'
        ])
        .pipe(concat('public/js/static/login.js'), {newLine: ';'})
        .pipe(uglify({mangle: true}))
        .pipe(filesize())
        .pipe(gulp.dest('.'))
});

gulp.task('register-js', function () {
    gulp.src([
            'public/src/js/framework/plugins/jquery/jquery.js',
            'public/src/js/framework/plugins/bootstrap/js/bootstrap.js',
            'public/src/js/framework/plugins/node-waves/waves.js',
            'public/src/js/framework/plugins/jquery-validation/jquery.validate.js',
            'public/src/static/lib/admin.js',
            'public/src/static/register/signup.js'
        ])
        .pipe(concat('public/js/static/register.js'), {newLine: ';'})
        .pipe(uglify({mangle: true}))
        .pipe(filesize())
        .pipe(gulp.dest('.'))
});

gulp.task('forgot-js', function () {
    gulp.src([
            'public/src/js/framework/plugins/jquery/jquery.js',
            'public/src/js/framework/plugins/bootstrap/js/bootstrap.js',
            'public/src/js/framework/plugins/node-waves/waves.js',
            'public/src/js/framework/plugins/jquery-validation/jquery.validate.js',
            'public/src/static/lib/admin.js',
            'public/src/static/forgot-password/forgot.js'
        ])
        .pipe(concat('public/js/static/forgot.js'), {newLine: ';'})
        .pipe(uglify({mangle: true}))
        .pipe(filesize())
        .pipe(gulp.dest('.'))
});

gulp.task('default', ['css', 'login-js', 'register-js', 'forgot-js'])
