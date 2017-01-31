import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import GirviItemView from './girviItemView';

class GirviItemsView extends ViewBase {

    className() {
        return "girvi-items";
    }

    events() {
        return {

        };
    }

    initialize() {
        this.template = this.getTemplate(templates, "_girviItemsPartial");
        this.girviItems = this.options.girviItems;
    }

    afterRender() {
        this.showGirviItems(this.girviItems);
    }

    // ------------------ Event Handlers > Start ------------------------


    // ------------------ Event Handlers > End --------------------------

    showGirviItems(girviItems) {
        _.each(girviItems, (girviItem) => {
            this.renderGirviItem(girviItem);
        });
    }

    renderGirviItem(girviItem) {
        var girviItemView = new GirviItemView({
            girviItem
        });
        this.insertView('.fn-girvi-items-container', girviItemView, true).render();
    }  

}

export default GirviItemsView;