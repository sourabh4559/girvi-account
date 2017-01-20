import EventBus from '../core/eventBus';
import LayoutView from '../common/layoutView';
import templates from '../../templates/app-templates';
import utils from '../common/utils';

class PageLayout extends LayoutView {

    initialize() {
        this.template = this.getTemplate(templates, '_pageLayoutPartial');
        this.listenTo(EventBus.defaultBus, App.BusEvents.window.resize, this.onWindowResize);
        this.listenTo(EventBus.defaultBus, App.BusEvents.window.orientationChange, this.onOrientationChange);
    }

    afterRender() {
        this.adjustContentholder();
        this.adjustLayoverholder();
    }

    onWindowResize() {
        utils.setHtmlHeightToWindowHeight();
        this.adjustContentholder();
    }

    onOrientationChange() {
        $(document.activeElement).blur();
        this.$('.fn-contentholder').focus();
        window.scrollTo(0, 0);

        utils.setHtmlHeightToWindowHeight();
        this.adjustContentholder();
    }

    hideContentContainer() {
        this.$('#layover-container').siblings('.content-container').hideElement();
    }

    showContentContainer() {
        this.$('#layover-container').siblings('.content-container').showElement();
    }

    renderLayoverView(contentView) {
        this.offsetValue = App.Common.utils.getWindowScrollTop();
        this.$('header').addClass("low-visibility-header");
        this.$('#layover-container').showElement();
        this.setView("#layover-container", contentView).render();
    }

    showLayoverView(callback) {
        this.$("#layover-container").animate({ 'top': 0 }, App.Constant.common.layoverAnimationDuration);
        App.Common.utils.scrollWithoutAnimation(0);
        if ($.isFunction(callback)) {
            _.delay(function() {
                callback();
            }, App.Constant.common.layoverAnimationDuration);
        }
        this.hideContentContainer();
    }

    hideLayoverView() {
        var self = this,
            animationCompleteCallback = function() {
                self.removeView("#layover-container");
                self.$('#layover-container').hideElement();
                App.Common.utils.scrollWithoutAnimation(self.offsetValue);
            };
        this.showContentContainer();
        this.$('header').removeClass("low-visibility-header");
        this.$("#layover-container").animate({ 'top': App.Common.utils.getWindowHeight() }, App.Constant.common.layoverAnimationDuration, animationCompleteCallback);
    }
}


export default PageLayout;