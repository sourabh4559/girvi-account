import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class RecentActivityView extends ViewBase {

    className() {
        return 'fn-recent-activity';
    }

    initialize() {
        this.template = this.getTemplate(templates, '_recentActivityPartial');
        this.recentActivities = this.options.recentActivities;
    }

    afterRender() {

    }

}

export default RecentActivityView;