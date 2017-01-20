'use strict';

module.exports = {
    bundle: {
        command: '<%= jspm.executable %> bundle-sfx scripts/app/app ' +
            '<%= jspm.outpath %>girvi-account/static/scripts/main.js --minify --skip-source-maps --inject',
        stdout: true,
        cwd: '<%= jspm.path %>'
    }
};
