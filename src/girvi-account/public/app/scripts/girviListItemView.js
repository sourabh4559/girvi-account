import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import utils from '../common/utils';

class GirviListItemView extends ViewBase {

    className() {
        return "girvi-list-item";
    }

    events() {
        return {
            "click": "onItemClick"
        };
    }

    initialize() {
        this.template = this.getTemplate(templates, "_girviListItemPartial");
        this.girviItem = this.options.girviItem;
    }

    serialize() {
        return {
            item: this.girviItem
        };
    }

    // -------------------- Event Handlers > Start ----------------------

    onItemClick(event) {
        var girviKey = this.$('.fn-girvi-info').attr('data-key');
        Backbone.history.navigate(utils.createUrl("/girvi", girviKey), {trigger: true});
    }

    // -------------------- Event Handlers > End ------------------------

}

export default GirviListItemView;