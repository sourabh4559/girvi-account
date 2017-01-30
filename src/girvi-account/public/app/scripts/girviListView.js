import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import GirviListItemView from './girviListItemView';

class GirviListView extends ViewBase {

    className() {
        return "fn-girvi-list";
    }

    events() {
        return {
            "keyup #search-girvi-textbox": "onSearchInputChange",
        };
    } 

    initialize() {
        this.template = this.getTemplate(templates, "_girviListPartial");
        this.girviList = this.options.girviList;
    }

    afterRender() {
        this.showGirviList(this.girviList);
    }

    // -------------------- Event Handlers > Start ----------------------

    onSearchInputChange(event) {
        var searchKey = $(event.target).val();
        var regex = new RegExp(searchKey +'.+$', 'i');
        var filteredGirviList = _.filter(this.girviList, (girviItem) => {
            return girviItem.name.search(regex) !== -1;
        });
        this.showGirviList(filteredGirviList);
    }

    // -------------------- Event Handlers > End ------------------------

    showGirviList(girviList) {
        this.removeView('.fn-girvi-list-item-container');
        _.each(girviList, (girviItem) => {
            this.renderGirviListItemView(girviItem);
        });
        // TODO - show no girvi found message
    }

    renderGirviListItemView(girviItem) {
        var girviListItemView = new GirviListItemView({
            girviItem
        });
        this.insertView('.fn-girvi-list-item-container', girviListItemView, true).render();
    }

}

export default GirviListView;