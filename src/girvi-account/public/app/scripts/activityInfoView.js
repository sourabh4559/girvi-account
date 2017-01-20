import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class ActivityInfoView extends ViewBase {

    className() {
        return 'fn-activity-info';
    }

    initialize() {
        this.template = this.getTemplate(templates, '_activityInfoPartial');
        this.activities = this.options.activities;
    }

    afterRender() {

    }

}

export default ActivityInfoView;