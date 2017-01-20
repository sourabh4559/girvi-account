'use strict';

// Compression Utility
module.exports = {
    main: {
        options: {
            mode: 'gzip'
        },
        files: [{
            expand: true,
            cwd: '../src/girvi-account/static/',
            src: ['*.js', '**/*.js'],
            dest: '../src/girvi-account/static/',
            rename: function(dest, src) {
                return dest + src + ".gz";
            }
        }]
    }   
};