'use strict';

var environment = (function() {
    var userAgent = navigator.userAgent.toLowerCase();

    function check(matchTo) {
        return matchTo.test(userAgent);
    }

    // This function is used to find out whether web app is running as standalone app
    // navigator.standalone only supported in iOS
    function isStandaloneApp() {
        return navigator.standalone;
    }

    function isiPhone() {
        return check(/iphone/i);
    }

    function isiPad() {
        return check(/ipad/i);
    }

    function isIPadWithiOS7() {
        /*ignore jslint start*/
        return check(/ipad;.*cpu.*os 7_\d/i);
        /*ignore jslint end*/
    }

    function isiOS() {
        return check(/ipad|iphone|ipod/i);
    }

    function isAndroid() {
        return check(/android/i);
    }

    function isBlackBerry() {
        return check(/blackberry/i);
    }

    function isChrome() {
        return check(/chrome/i);
    }

    function isChromeOnIOS() {
        return check(/crios/);
    }

    function isFirefox() {
        return check(/firefox/i);
    }

    function isSafari() {
        return !isChrome() && check(/safari/);
    }

    function isOpera() {
        return check(/opera/);
    }

    function isIE() {
        return !isOpera() && check(/msie/);
    }

    function isWindows() {
        return check(/windows|win32/);
    }

    function isMac() {
        return check(/macintosh|mac os x/);
    }

    function isTouchDevice() {
        return check(/android|webos|iphone|ipad|ipod|blackberry/);
    }

    function isCookieEnabled() {
        return navigator.cookieEnabled;
    }

    function isNexus() {
        return check(/nexus/i);
    }

    function isPortraitMode() {
        return $(window).innerHeight() > $(window).innerWidth();
    }

    function isLandscapeMode() {
        return $(window).innerWidth() > $(window).innerHeight();
    }

    function isMobileDevice() {
        if (isiOS() ||
            isAndroid() ||
            isBlackBerry() ||
            isTouchDevice() ||
            isNexus()) {
            return true;
        } else {
            return false;
        }
    }

    function isSecure() {
        return window.location.protocol === 'https:';
    }

    function iOSVersion() {
        var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
            version;

        if (match) {
            version = [
                parseInt(match[1], 10),
                parseInt(match[2], 10),
                parseInt(match[3] || 0, 10)
            ];
            return parseFloat(version.join('.'));
        }
        return 0;
    }
        

    return {

        isSafari: isSafari(),
        isIE: isIE(),
        isChrome: isChrome(),
        isChromeOnIOS: isChromeOnIOS(),
        isFirefox: isFirefox(),
        isIOS: isiOS(),
        isiPad: isiPad(),
        isIPadWithiOS7: isIPadWithiOS7(),
        isTouchDevice: isTouchDevice(),
        isCookieEnabled: isCookieEnabled(),
        //method to get if the version of androiod is as specified.
        isAndroidVersionCurrentOrAbove: function(major, minor, build) {
            var result = false,
                regex;
            regex = new RegExp("Android (([" + major + "-9]\\." + minor + "\\.[" + build + "-9]\\d*)|([" + major + "-9]\\.[" +
                (minor + 1) + "-9](\\.\\d+)?\\d*)|([" + (major + 1) + "-9](\\.\\d+)?(\\.\\d+)?\\d*))");
            if (navigator.userAgent.match(regex)) {
                result = true;
            }
            return result;
        },
        isNexus: isNexus(),
        isPortraitMode: isPortraitMode(),
        isLandscapeMode: isLandscapeMode(),
        isMobileDevice: isMobileDevice(),
        isAndroid: isAndroid(),
        isStandaloneApp: isStandaloneApp(),
        isSecure: isSecure(),
        iOSVersion: iOSVersion()
    };
})();

export default environment;
