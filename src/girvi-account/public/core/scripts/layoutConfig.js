'use strict';

import Backbone from 'backbone';

Backbone.Layout.configure({
    renderTemplate: function (template, context) {
        context = context || {};
        var html;
        if (this.headerTemplate) {
        	html = this.headerTemplate(context) + template(context);	
        } else {
            html = template(context);
        }
        return html;
    }
});