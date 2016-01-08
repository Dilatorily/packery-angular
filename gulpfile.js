'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var karma = require('karma').Server;

var sources = 'src/**/*.js';
var specs = 'test/**/*.spec.js';
var reports = 'reports/**/lcov.info';
var versions = ['package.json', 'bower.json'];

gulp.task('test', test);
gulp.task('test:lint', lint);
gulp.task('test:unit', unit);
gulp.task('test:coveralls', coveralls);

gulp.task('dist', dist);

gulp.task('version:major', version('major'));
gulp.task('version:minor', version('minor'));
gulp.task('version:patch', version('patch'));

function test(done) {
    runSequence(
        [
            'test:lint',
            'test:unit'
        ],
        done
    );
}

function lint() {
    return gulp.src([sources, specs])
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jscsStylish.combineWithHintResults())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
}

function unit(done) {
    new karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
}

function coveralls() {
    return gulp.src(reports)
        .pipe($.coveralls());
}

function dist() {
    gulp.src(sources)
        .pipe(gulp.dest('dist'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
}

function version(type) {
    return function () {
        return gulp.src(versions)
            .pipe($.bump({ type: type }))
            .pipe(gulp.dest('.'))
            .pipe($.git.commit('[CHORE] Bump package version'))
            .pipe($.filter(versions[0]))
            .pipe($.tagVersion);
    };
}
