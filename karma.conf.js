'use strict';

module.exports = function (configuration) {
    configuration.set({
        autoWatch: false,
        basePath: '',
        browsers: ['PhantomJS'],
        colors: true,
        concurrency: Infinity,
        coverageReporter: {
            dir: 'reports',
            subdir: '.',
            type: 'lcov'
        },
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/draggabilly/dist/draggabilly.pkgd.min.js',
            'node_modules/packery/dist/packery.pkgd.min.js',
            'src/**/*.js',
            'test/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        logLevel: configuration.LOG_INFO,
        port: 9876,
        preprocessors: { 'src/**/*.js': ['coverage'] },
        reporters: ['dots', 'coverage'],
        singleRun: true
    });
};
