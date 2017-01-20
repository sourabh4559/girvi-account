'use strict';

// Copies file from one place to another
module.exports = {
    js: {
        files: [{
            expand: true,
            cwd: '<%= paths.public %>/',
            src: ['*.js'],
            dest: '<%= paths.static %>/scripts/'
        }, {
            expand: true,
            cwd: '<%= paths.public %>/vendor/',
            src: ['*.js', '*/*.js', ],
            dest: '<%= paths.static %>/scripts/vendor/'
        }, {
            expand: true,
            cwd: '<%= paths.public %>/jspm_packages/',
            src: ['*.js', '**/*.js', ],
            dest: '<%= paths.static %>/scripts/jspm_packages/'
        }, {
            expand: true,
            cwd: '<%= paths.public %>/core/scripts/',
            src: ['*.js', '*/*.js', ],
            dest: '<%= paths.static %>/scripts/core/'
        }, {
            expand: true,
            cwd: '<%= paths.public %>/common/scripts/',
            src: ['*.js', '*/*.js', ],
            dest: '<%= paths.static %>/scripts/common/'
        }, {
            expand: true,
            cwd: '<%= paths.public %>/app/scripts/',
            src: ['*.js', '*/*.js', ],
            dest: '<%= paths.static %>/scripts/app/'
        }]
    },
    views: {
        files: [{
            expand: true,
            flatten: true,
            src: ['<%= paths.public %>/*.html'],
            dest: '<%= paths.static %>/'
        }]
    },
    fonts: {
        files: [{
            expand: true,
            flatten: true,
            src: ['<%= paths.public %>/common/fonts/*.*'],
            dest: '<%= paths.static %>/fonts/'
        }]
    },
    images: {
        files: [{
            expand: true,
            flatten: true,
            src: ['<%= paths.public %>/app/images/*.*', '<%= paths.public %>/common/images/*.*'],
            dest: '<%= paths.static %>/images/'
        }]
    },
    systemloader: {
        files: [{
            expand: true,
            flatten: true,
            src: [
                '<%= paths.public %>/jspm_packages/system-csp-production.js',
            ],
            dest: '<%= paths.static %>/scripts/'
        }]
    }
};