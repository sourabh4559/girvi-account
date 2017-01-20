'use strict';

// Empties folders
module.exports = {
    options: {
        force: true
    },
    build: ['<%= paths.static %>'],
    prod: [
        '<%= paths.static %>/stylesheets/*.*',
        '<%= paths.static %>/templates',
        '<%= paths.static %>/scripts/app'
    ]
};
