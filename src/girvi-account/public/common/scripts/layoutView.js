'use strict';

import ViewBase from './viewBase';
import navigationHistoryManager from './navigationHistoryManager';
import utils from './utils';
import Enum from './enum';
import {common} from './constant.js';

class LayoutView extends ViewBase {

    renderView(view, animateDirection) {
        var jDeferred = $.Deferred();
            var self = this,
                placeholderToRender, placeholderToRemove, marginLeftValue,
                contentWrapper, firstContentHolder, lastContentHolder, previouslyRenderedView,
                animationCompleteCallback;
            self.renderingInProgress = true;

           
        if (!animateDirection) {
            animateDirection = Enum.animateDirection.none;
        }

        switch (animateDirection) {
            case Enum.animateDirection.leftToRight:
                self.prependNewContentHolder();
                placeholderToRender = '.content-wrapper:first > .contentholder:first';
                placeholderToRemove = '.content-wrapper:first > .contentholder:last';
                marginLeftValue = 0;
                break;
            case Enum.animateDirection.rightToLeft:
                self.appendNewContentHolder();
                placeholderToRender = '.content-wrapper:first > .contentholder:last';
                placeholderToRemove = '.content-wrapper:first > .contentholder:first';
                marginLeftValue = -(self.$('.content-wrapper:first > .contentholder:first').width());
                break;
            default:
                placeholderToRender = '.content-wrapper:first > .contentholder:first';
                placeholderToRemove = '.content-wrapper:first > .contentholder:last';
                marginLeftValue = 0;
                break;
        }

        // Initialized later as new div is added in the above code
        contentWrapper = self.$('.content-wrapper:first');
        firstContentHolder = self.$('.content-wrapper:first > .contentholder:first');
        lastContentHolder = self.$('.content-wrapper:first > .contentholder:last');

        previouslyRenderedView = self.getView(placeholderToRender);
        self.animationCompleteCallback = function() {
            let viewToRemove = self.getView(placeholderToRemove);
            if (viewToRemove) {
                viewToRemove.remove();
            }
            if (animateDirection === Enum.animateDirection.rightToLeft) {
                self.$('.content-wrapper:first > .contentholder:first').remove();
                contentWrapper.css('width', contentWrapper.width() - firstContentHolder.width());
            } else if (animateDirection === Enum.animateDirection.leftToRight) {
                self.$('.content-wrapper:first > .contentholder:last').remove();
                contentWrapper.css('width', contentWrapper.width() - lastContentHolder.width());
            }
            self.$('.content-wrapper:first > .contentholder:first').css('-webkit-transform', 'none');
            self.adjustContentholder();
            //set the new screen on top of the window.
            utils.scrollWithoutAnimation(0);
            if (view.afterTransition) {
                view.afterTransition();
            }
            self.renderingInProgress = false;
        };

        self.setView(placeholderToRender, view).render().then(function() {
            if (animateDirection) {
                $(firstContentHolder).transition($.extend({
                    'margin-left': marginLeftValue
                }, common.transitionAddOnProperties), common.pageTransitionSpeed, function() {
                    _.defer(self.animationCompleteCallback);
                    if (view.afterTransition) {
                        view.afterTransition();
                    }
                });
                jDeferred.resolve(view);
            } else {
                _.defer(self.animationCompleteCallback);
                if (view.afterTransition) {
                    view.afterTransition();
                }
                jDeferred.resolve(view);
            }
        });
            
        return jDeferred.promise();
    }


    /*
       It just calles the callback function with argumentes extracted from config object
       Params
       callback : is function which needs to be called when trigger executes
       config : represents the configuration paramters for callback function
    */
    navigationCallback(callback, config) {
        //when renderView function called directly with view as parameter
        if (callback) {
            if (typeof config.callbackArgs !== "undefined") {
                callback.call(this, config.callbackArgs, config.animationDirection);
            }
            //event trigger sends the custom object to lister
            else if (config.eventObj) {
                config.eventObj.animateDirection = config.animationDirection;
                callback.call(this, config.eventObj);
            }
            //when none of callbackParams or eventObj present for listner
            else {
                callback.call(this, config.animationDirection);
            }
        }
    }

    /*
       Set the direction from left to right
       Params
       callback : is function which needs to be called when trigger executes
       eventArgs : is arguments passed by trigger to listner
       args : is arguments passed when below function is called directly without bind operation and with arguments
    */
    navigateToNextScreen(callback, eventObj, args) {
        this.navigationCallback(callback, {
            callbackArgs: args,
            eventObj: eventObj,
            animationDirection: Enum.animateDirection.rightToLeft
        });
    }

    /*
       Set the direction from right to left
       Params
       callback : is function which needs to be called when trigger executes
       eventArgs : is arguments passed by trigger to listner
       args : is arguments passed when below function is called directly without bind operation and with arguments
    */
    navigateToPreviousScreen(callback, eventObj, args) {
        this.navigationCallback(callback, {
            callbackArgs: args,
            eventObj: eventObj,
            animationDirection: Enum.animateDirection.leftToRight
        });
    }

    /*
       Set the no direction
       Params
       callback : is function which needs to be called when trigger executes
       eventArgs : is arguments passed by trigger to listner
       args : is arguments passed when below function is called directly without bind operation and with arguments
    */
    navigateWithNoAnimation(callback, eventObj, args) {
        this.navigationCallback(callback, {
            callbackArgs: args,
            eventObj: eventObj,
            animationDirection: Enum.animateDirection.none
        });
    }

    appendNewContentHolder() {
        var newContentHolder,
            contentWrapper = this.$('.content-wrapper:first');
        newContentHolder = this.createNewContentHolder();
        contentWrapper.css('width', contentWrapper.width() + newContentHolder.width());
        contentWrapper.append(newContentHolder);
    }

    prependNewContentHolder() {
        var newContentHolder,
            contentWrapper = this.$('.content-wrapper:first');
        newContentHolder = this.createNewContentHolder();
        newContentHolder.css('margin-left', -(newContentHolder.width()));
        contentWrapper.css('width', contentWrapper.width() + newContentHolder.width());
        contentWrapper.prepend(newContentHolder);
    }

    createNewContentHolder() {
        var newContentHolder,
            contentHolder = this.$('.contentholder:first');

        newContentHolder = $('<div/>').attr({
            'class': 'contentholder feature-placeholder'
        }).css({
            'width': contentHolder.css('width'),
            'min-height': utils.getWindowHeight()
        });
        return newContentHolder;
    }

    adjustContentholder() {
        var self = this,
            containerWidth = utils.getWindowWidth(),
            containerHeight = utils.getWindowHeight();

        // set wrapper width and min-height
        this.$('.content-wrapper').css({
            'width': this.$('.content-wrapper:first > .contentholder').length * containerWidth,
            'min-height': containerHeight
        });


        // set contentHolder width and height
        this.$('.contentholder').css({
            'width': containerWidth,
            'min-height': containerHeight
        });

        // set content container width
        this.$(".content-container").css('width', containerWidth);
    }

    renderLayoverView(contentView) {
        this.offsetValue = utils.getWindowScrollTop();
        if (contentView.viewState) {
            this.lastViewState = contentView.viewState();
        }
        this.$('header').addClass("low-visibility-header");
        this.$('#layover-container').removeClass("hide");
        this.setView("#layover-container", contentView).render();
        this.adjustLayoverholder();
    }

    showLayoverView(callback) {
        this.$('#layover-container').removeClass("hide");
        this.$("#layover-container").transition({
            'top': 0
        }, App.Constant.common.pageTransitionSpeed);
        //Todo- need to remove view reference in callback function
        //then no need of function type check
        if ($.isFunction(callback)) {
            _.delay(function() {
                callback();
            }, App.Constant.common.pageTransitionSpeed);
        }
        this.hideContentContainer();
    }

    hideLayoverView() {
        var layoverContainerElement = this.$el.find("#layover-container"),
            self = this,
            animationCompleteCallback = function() {
                self.removeView("#layover-container");
                layoverContainerElement.addClass("hide");
                utils.scrollTo(self.offsetValue);
            };
        this.showContentContainer();
        this.$('header').removeClass("low-visibility-header");
        this.$("#layover-container").transition({
            'top': utils.getWindowHeight()
        }, App.Constant.common.pageTransitionSpeed, animationCompleteCallback);
    }

    hideContentContainer() {
        this.$('#layover-container').siblings('.content-container').hideElement();
    }

    showContentContainer() {
        this.$('#layover-container').siblings('.content-container').showElement();
    }

    adjustLayoverholder() {
        var containerWidth = utils.getWindowWidth(),
            containerHeight = utils.getWindowHeight();
        this.$('#layover-container').css({
            'min-height': containerHeight,
            'top': containerHeight
        });
    }

    showFeature(view, viewType, callback) {
        var animateDirection = Enum.animateDirection.none;
        if ($.trim(this.$('.contentholder').html()).length) {
            // Get animation direction from navigation history manager in case
            // some feature is already rendered.
            animateDirection = navigationHistoryManager.getAnimationDirection(viewType);
        }
        navigationHistoryManager.onRoute(viewType);
        this.renderView(view, animateDirection, callback);
    }
}

export
default LayoutView;
