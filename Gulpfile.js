"use strict";

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    jest = require('gulp-jest'),
    less = require('gulp-less'),
    debug = require('gulp-debug'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    handleErrors = require('./util/handleErrors'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),

    DEST_DIR = 'build';


gulp.task('browserify', function () {
    gulp.src('src/js/app.js')
        .pipe(browserify(
            {
                transform: ['reactify'],
                insertGlobals: true,
                debug: !argv.production,
                extensions: ['.js']
            }
        ))
        .pipe(concat('bundle.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest(DEST_DIR + '/js'))
        .pipe(livereload());
});

gulp.task('less', function () {
    return gulp.src('src/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', handleErrors)
        .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write())
        .pipe(gulpif(argv.production, minifycss({keepSpecialComments: 0})))
        .on('error', handleErrors)
        .pipe(gulp.dest(DEST_DIR + '/css'))
        .pipe(livereload());
});

gulp.task('copy', function () {
    gulp.src('src/*.*')
        .pipe(gulp.dest(DEST_DIR))
        .pipe(livereload());

    gulp.src('src/img/*.*')
        .pipe(gulp.dest(DEST_DIR + '/img'))
        .pipe(livereload());

    gulp.src('node_modules/bootstrap/fonts/*.*')
        .pipe(gulp.dest(DEST_DIR + '/fonts'));
});

gulp.task('watch-files', function () {
    livereload.listen();
    gulp.watch('src/*.*', ['build']);
    gulp.watch('src/js/**/*.*', ['browserify']);
    gulp.watch('src/less/**/*.*', ['less']);
});

gulp.task('build', ['browserify', 'less', 'copy']);
gulp.task('watch', ['build', 'watch-files']);