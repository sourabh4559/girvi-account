'use strict';

// Compiles handlebar templates
module.exports = {
    dev: {
        options: {
            commonjs: true,
            namespace: 'App.jst',
            partialsUseNamespace: true,
            processPartialName: function(filePath) {
                var pieces = filePath.split("/");
                var fileName = pieces[pieces.length - 1];
                return fileName.substr(0, fileName.lastIndexOf('.htm'));
            }
        },
        files: {
            "<%= paths.static %>/templates/common-templates.js": "<%= paths.public %>/common/templates/*.htm",
            "<%= paths.static %>/templates/app-templates.js": "<%= paths.public %>/app/templates/*.htm"
        }
    }
};
