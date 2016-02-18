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
gulp.task('dist:minimize', minimize);
gulp.task('dist:docs', docs);

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

function dist(done) {
    runSequence(
        [
            'dist:minimize',
            'dist:docs'
        ],
        done
    );
}

function minimize() {
    return gulp.src(sources)
        .pipe(gulp.dest('dist'))
        .pipe($.uglify({ preserveComments: 'license' }))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
}

function docs() {
    return gulp.src(sources)
        .pipe($.ngdocs.process({
            html5Mode: false,
            startPage: '/api/packery-angular',
            titleLink: 'https://github.com/Dilatorily/packery-angular'
        }))
        .pipe(gulp.dest('docs'));
}

function version(type) {
    return function () {
        return gulp.src(versions)
            .pipe($.bump({ type: type }))
            .pipe(gulp.dest('.'))
            .pipe($.git.commit('[CHORE] Bump package version'))
            .pipe($.filter(versions[0]))
            .pipe($.tagVersion());
    };
}
