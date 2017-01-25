'use strict';

var utils = {
    getWindowHeight: function() {
        return Math.min($(window).height(), window.innerHeight || Infinity);
    },

    getWindowWidth: function() {
        return $(window).width();
    },

    setHtmlHeightToWindowHeight: function() {
        $('html').css('height', this.getWindowHeight());
    },

    preventDefaultBehaviour: function(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
    },

    stopImmediatePropagation: function(event) {
        if (event && event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        }
    },

    getWindowScrollTop() {
        return $(window).scrollTop();
    },

    scrollTo(scrollTop) {
        $('body').animate({
            scrollTop: scrollTop
        }, 1000);
    },

    scrollWithoutAnimation(position) {
        $('body').scrollTop(position);
    },

    createUrl: function(baseUrl) {
        var encodedUrl = baseUrl;
        if (arguments.length > 1) {
            for (var i = 1; i <= arguments.length - 1; i++) {
                encodedUrl = encodedUrl.concat("/").concat(encodeURIComponent(arguments[i]));
            }
        }
        return encodedUrl;
    }
};

export default utils;