'use strict';

// Compiles scss files
module.exports = {
    options: {
        sourceMap: false,
    },
    compile: {
        files: {
            '<%= paths.static %>/stylesheets/index.css': '<%= paths.public %>/app/stylesheets/index.scss',
        }
    }
};