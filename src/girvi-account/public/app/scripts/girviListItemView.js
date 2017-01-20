import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class GirviListItemView extends ViewBase {

    className() {
        return ".fn-girvi-list-item";
    }

    initialize() {
        this.template = this.getTemplate(templates, "_girviListItemPartial");
        this.girviItem = this.options.girviItem;
    }

    serialize() {
        return {
            girviItem: this.girviItem
        };
    }

    afterRender() {

    }

}

export default GirviListItemView;