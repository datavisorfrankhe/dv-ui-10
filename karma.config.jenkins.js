// Karma configuration
// Generated on Fri Apr 09 2021 12:30:10 GMT+0800 (China Standard Time)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', '@angular-devkit/build-angular'],

        // Karma can be easily extended through plugins. In fact, all the existing preprocessors, reporters, browser launchers and frameworks are plugins.
        // You can install existing plugins from NPM or you can write your own plugins for Karma.
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-coverage-istanbul-reporter',
            '@angular-devkit/build-angular/plugins/karma',
            'karma-junit-reporter',
        ],

        // list of files / patterns to load in the browser
        files: ['**/*spec.ts'],

        client: {
            // Clear the context window
            // If true, Karma clears the context window upon the completion of running the tests. If false, Karma does not clear the context window upon the
            // completion of running the tests. Setting this to false is useful when embedding a Jasmine Spec Runner Template.
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            'kjhtml',
            'coverage-istanbul',
            'dots',
            'junit'
        ],

        junitReporter: {
            outputFile: 'test-results.xml'
        },

        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
            reports: ['html', 'lcovonly', 'text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: require('path').join(__dirname, 'coverage'),

            // Combines coverage information from multiple browsers into one report rather than outputting a report
            // for each browser.
            combineBrowserReports: true,

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,

            // Omit files with no statements, no functions and no branches covered from the report
            skipFilesWithNoCoverage: true,

            // Most reporters accept additional config options. You can pass these through the `report-config` option
            'report-config': {
                // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
                html: {
                    // outputs the report in ./coverage/html
                    subdir: 'html'
                }
            },

            // enforce percentage thresholds
            // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
            thresholds: {
                emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
                // thresholds for all files
                global: {
                    statements: 100,
                    lines: 100,
                    branches: 100,
                    functions: 100
                },
                // thresholds per file
                each: {
                    statements: 100,
                    lines: 100,
                    branches: 100,
                    functions: 100,
                    overrides: {
                        'baz/component/**/*.js': {
                            statements: 98
                        }
                    }
                }
            },

            verbose: true // output config used by istanbul for debugging
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        //singleRun: false,


        // DO NOT REMOVE BELOW - This is how to run in headless mode
        browsers: ['ChromeHeadlessCI'],
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        singleRun: true,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};
