module.exports = function(grunt) {
    'use strict';

    // measures the time each task takes
    require('time-grunt')(grunt);

    // Set jspm executable paths according to environment
    var jspmPath = "",
        jspmExecutable = "",
        jspmOutPath = "";
    if (process.platform === "win32") {
        jspmPath = "./node_modules/.bin/";
        jspmExecutable = "jspm";
        jspmOutPath = "../../../src/";
    } else {
        jspmExecutable = "./node_modules/jspm/jspm.js";
        jspmOutPath = "../src/";
    }

    // load grunt config
    require('load-grunt-config')(grunt, {
        data: {
            paths: {
                // Configurable paths
                src: '../src',
                public: '../src/girvi-account/public',
                static: '../src/girvi-account/static'
            },
            jspm: {
                path: jspmPath,
                executable: jspmExecutable,
                outpath: jspmOutPath
            }
        },
    });

    grunt.registerTask('dev', [
        'clean:build',
        'jshint',
        'copy',
        'sass',
        'handlebars',
        'cachebuster',
        'compress'
    ]);

    grunt.registerTask('production', [
        'clean:build',
        'jshint',
        'copy',
        'sass',
        'handlebars',
        'exec:bundle',
        'usemin',
        'clean:prod',
        'cachebuster',
        'compress'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};