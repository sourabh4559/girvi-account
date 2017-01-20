'use strict';

import Backbone from 'backbone';
import Handlebars from 'handlebars';
import ManagedViewBase from '../core/managedViewBase';
import EventBus from '../core/eventBus';
import "../core/handlebarsUtil";
import '../core/extensionMethods';
//import ajaxRequestProcessingImageHelper from './ajaxRequestProcessingImageHelper';
//import ProcessingImageView from './processingImageView';

class ViewBase extends ManagedViewBase {

    /*
    showLoader(options) {
        options = options || {};
        var self = this,
            loaderText = options.loaderText || "",
            loaderSubText = options.loaderSubText || "";
        if (!this.processingImageView) {
            this.processingImageView = new ProcessingImageView({
                loaderText: loaderText,
                loaderSubText: loaderSubText
            });
            if (!options.contextElement) {
                if(options.isSetScroll) {
                    this.scrollPosition = $('body').scrollTop();
                    App.Common.utils.setWindowUIForScroll(this.scrollPosition);  
                }
                this.$el.append(this.processingImageView.$el);
                this.processingImageView.render();
            } else {
                options.contextElement.showElement();
                this.processingImageView.render().once('afterRender', function() {
                    self.processingImageView.$el.appendTo(options.contextElement);
                });
            }
        }
    }

    //Avoid faidout in case animation/async is not required
    hideLoader(isWithoutAnimation) {
        var self = this;
        if (self.processingImageView) {
            if (isWithoutAnimation) {
                self.removeLoader();
            } else {
                self.processingImageView.fadeOut(function() {
                    self.removeLoader();
                });
            }
        }
    }

    removeLoader() {
        if(this.scrollPosition) {
            App.Common.utils.resetWindowUIForScroll(this.scrollPosition);
        }
        this.processingImageView.remove();
        this.processingImageView = null;
        this.scrollPosition = null;
    }

    updateLoaderText(loaderText, loaderSubText) {
        if (this.processingImageView) {
            this.processingImageView.updateLoaderText(loaderText, loaderSubText);
        }
    }

    attachAjaxRequestProcessingLoader(options) {
        ajaxRequestProcessingImageHelper.attach(this, options);
    }

    detachAjaxRequestProcessingLoader() {
        ajaxRequestProcessingImageHelper.detach(this);
    }
    */

    setWindowCloseMessage(message) {
        window.windowCloseMessage = message;
    }

    getTemplate(templates, templateName) {
        return templates(Handlebars)[templateName];
    }

    cleanup() {
        if (this.cleanupInternal) {
            this.cleanupInternal();
        }
    }
}

export
default ViewBase;