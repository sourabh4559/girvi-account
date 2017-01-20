var navigationHistoryManager = (function() {
    "use strict";
    var navigationHistory = [];
    return {
        onRoute: function(featureType) {
            var currentUrl = window.location.href,
                currentContext;
            
            if (featureType === App.Enum.viewType.rootDashboard) {
                navigationHistory = [];
                currentContext = {
                    "featureType": featureType,
                    "url": currentUrl
                };
            } else if (currentUrl.split("#")[1] !== this.getRoutePathForCurrentFeature()) {
                currentContext = {
                    "featureType": featureType,
                    "url": currentUrl
                };
                if (navigationHistory.length > 1 && this.getLastPositionInNavigationHistory(currentUrl) === navigationHistory.length -
                    2) {
                    navigationHistory.splice(navigationHistory.length - 2);
                }
            }   
            if (currentContext) {
                navigationHistory.push(currentContext);
            }
        },

        getRoutePathForCurrentFeature: function() {
            if (navigationHistory.length > 0) {
                var currentFeature = navigationHistory[navigationHistory.length - 1];
                return currentFeature.url.split("#")[1];
            }
        },

        getRoutePathForPreviousFeature: function() {
            if (navigationHistory.length > 1) {
                var previousFeature = navigationHistory[navigationHistory.length - 2];
                return previousFeature.url.split("#")[1];
            }
            return "#";
        },

        getAnimationDirection: function(featureType) {
            var currentUrl = window.location.href,
                direction = App.Enum.animateDirection.none;
            if (navigationHistory.length !== 0) {
                direction = App.Enum.animateDirection.rightToLeft;
                if (navigationHistory.length > 1 && this.getLastPositionInNavigationHistory(currentUrl) === navigationHistory.length -
                    2) {
                    direction = App.Enum.animateDirection.leftToRight;
                }
            } else if (featureType === App.Enum.viewType.rootDashboard) {
                direction = App.Enum.animateDirection.rightToLeft;
            }
            return direction;
        },

        getLastPositionInNavigationHistory: function(url) {
            var position = -1,
                i;

            for (i = navigationHistory.length - 1; i >= 0; i--) {
                if (navigationHistory[i].url === url) {
                    position = i;
                    break;
                }
            }
            return position;
        },

        getNavigationHistoryLength : function(){
            return navigationHistory.length;
        }
    };
})();

export
default navigationHistoryManager;
