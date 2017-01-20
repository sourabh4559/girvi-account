'use strict';

import 'jquery';
import 'transit';
import 'fastclick';
import EventBus from '../core/eventBus';
import environment from './environment';
import {common} from "./constant";
import utils from './utils';

var globalEventHandlers = (function() {
    var lastHeight, lastWidth = null;

    $(window).on("beforeunload", function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.window.beforeUnload, event);
        if (window.windowCloseMessage) {
            var message = window.windowCloseMessage;
            window.windowCloseMessage = undefined;
            return message;
        } else {
            EventBus.defaultBus.trigger(App.BusEvents.window.close, event);
        }
    });

    $(window).unload(function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.window.unload, event);
    });

    $(window).on("error", function(event) {
        var originalEvent = event.originalEvent;
        var errorInfo = originalEvent.filename + ':' + originalEvent.lineno + ':' + originalEvent.colno + ':' + originalEvent.message;
        if (originalEvent.error && originalEvent.error.stack) {
            errorInfo = errorInfo + "\n" + originalEvent.error.stack;
        }
        EventBus.defaultBus.trigger(App.BusEvents.window.errorInfo, errorInfo);
    });

    $(window).on("orientationchange", function(event) {
        // window orientation change is detected after some time
        // so call the orientation change settings after the delay
        // On orientation change, after 250 milliSecs exact width and height detected
        // http://forum.jquery.com/topic/orientationchange-event-returns-wrong-values-on-android
        var timerInterval = 250;
        if (environment.isIPadWithiOS7) {
            timerInterval = 400;
        }
        window.setTimeout(function() {
            EventBus.defaultBus.trigger(App.BusEvents.window.orientationChange, event);
        }, timerInterval);
    });

    $(window).on("resize", function(evt) {
        if (environment.isIOS) {
            if (lastHeight == null || lastWidth == null || lastWidth !== utils.getWindowWidth()) {
                lastHeight = utils.getWindowHeight();
                lastWidth = utils.getWindowWidth();
                EventBus.defaultBus.trigger(App.BusEvents.window.resize);
            }
        } else {
            EventBus.defaultBus.trigger(App.BusEvents.window.resize);
        }
    });


    $(window).bind('hashchange', function(evt) {
        EventBus.defaultBus.trigger(App.BusEvents.window.hashChange, evt);
    });

    $(window).on("focus", function(evt) {
        EventBus.defaultBus.trigger(App.BusEvents.window.focus);
    });

    $(window).on("blur", function(evt) {
        EventBus.defaultBus.trigger(App.BusEvents.window.focusout);
    });

    $(window).on("popstate", function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.window.onPopState, window.history);
    });

    $(window).on("scroll", function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.window.scroll, event);
    });

    $(document).on("ajaxSend", function(evt, jqXHR, options) {
        EventBus.defaultBus.trigger(App.BusEvents.document.ajaxSend, jqXHR);
    });

    $(document).on("ajaxStop", function(evt) {
        EventBus.defaultBus.trigger(App.BusEvents.document.ajaxStop);
    });

    $(document).on("ajaxComplete", function(evt, jqXHR, options) {
        EventBus.defaultBus.trigger(App.BusEvents.document.ajaxComplete, jqXHR);
    });

    $(document).mousedown(function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.document.mouseDown, event);
    });

    $(document).mouseup(function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.document.mouseUp, event);
    });

    $(document).bind("mousewheel", function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.document.mouseScroll, event);
    });

    $(document).bind("touchend", function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.document.touchstart, event);
    });

    $(document).bind("touchstart", function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.document.touchstart, event);
    });

    $(document).click(function(event) {
        EventBus.defaultBus.trigger(App.BusEvents.document.click, event);
    });

    $(document).ready(function() {
        // Attach Fastclick to remove 300ms delay on touch UIs
        FastClick.attach(document.body);

        // Delegate .transition() calls to .animate()
        // if the browser can't do CSS transitions.
        if (!$.support.transition) {
            $.fn.transition = $.fn.animate;
        }
    });

    $(document).keydown(function(event) {
        if (event.which === common.enterKeyCode) { //Enter
            EventBus.defaultBus.trigger(App.BusEvents.document.enterKeyPress, event);
        }
    });

    //Trigger event when browser window comes in foreground again.
    $(document).on("visibilitychange", function(event) {
        if (document.visibilityState === "visible") {
            EventBus.defaultBus.trigger(App.BusEvents.document.visibilitychange);
        }
        if (document.visibilityState === "hidden") {
            EventBus.defaultBus.trigger(App.BusEvents.document.visibilityhidden);
        }
    });

})();

export default globalEventHandlers;
