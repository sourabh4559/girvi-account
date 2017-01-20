(function() {
    'use strict';

    window.App = window.App || {};
    App.BusEvents = App.BusEvents || {};

    App.BusEvents = {
        common: {
            userStartTyping: "user:startTyping",
            showErrorMessage: "error:showErrorMessage",
            hideErrorMessage: "error:hideErrorMessage",
            serverError: "error:serverError",
            afterTransition: "common:afterTransition",
            updateResourceStrings: "common:updateResourceStrings"
        },
        window: {
            orientationChange: "window:orientationChange",
            resize: "window:resize",
            unload: "window:unload",
            close: "window:close",
            beforeUnload: "window:beforeUnload",
            focus: "window:focus",
            focusout: "window:focusout",
            errorInfo: "window:errorInfo",
            hashChange: "window:hashChange",
            onPopState: "window:onPopState",
            scroll: "window:scroll",
        },
        document: {
            mouseDown: "document:mouseDown",
            mouseScroll: "document:mouseScroll",
            click: "document:click",
            ajaxSend: "document:ajaxSend",
            ajaxStop: "document:ajaxStop",
            ajaxComplete: "document:ajaxComplete",
            enterKeyPress: "document:enterKeyPress",
            touchend: "document:touchend",
            overlayConfirmed: "document:overlayConfirmed",
            visibilitychange: "document:visibilitychange",
            visibilityhidden: "document:visibilityhidden",
            touchstart: "document:touchstart"
        }
    };
})();
