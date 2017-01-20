import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import GirviListItemView from './girviListItemView';

class GirviListView extends ViewBase {

    className() {
        return "fn-girvi-list";
    }

    initialize() {
        this.template = this.getTemplate(templates, "_girviListPartial");
        this.girviList = this.options.girviList;
    }

    afterRender() {
        console.log(this.girviList);
        // Render all girvi items
        this.renderGirviListItemView();
        this.renderGirviListItemView();
    }

    renderGirviListItemView(girviItem) {
        var girviListItemView = new GirviListItemView({
            girviItem
        });
        this.insertView('.fn-girvi-list-item-container', girviListItemView, true).render();
    }

}

export default GirviListView;