'use strict';

// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
	options: {
    	jshintrc: '.jshintrc'
  	},
  	files: [
    	'Gruntfile.js',
        '<%= paths.public %>/**/*.js',
        '!<%= paths.public %>/vendor/**/*.js',
        '!<%= paths.public %>/jspm_packages/**/*.js'
    ]
};
