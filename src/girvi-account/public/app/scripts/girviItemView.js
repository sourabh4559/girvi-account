import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class GirviItemView extends ViewBase {

    className() {
        return 'girvi-item';
    }

    events() {
        return {

        };
    }

    initialize() {
        this.template = this.getTemplate(templates, '_girviItemPartial');
        this.girviItem = this.options.girviItem;
    }

    serialize() {
        return {
            item: this.girviItem
        };
    }

    afterRender() {
        
    }

    // ------------------------ Event Handlers > Start ------------------------



    // ------------------------ Event Handlers > End --------------------------

}

export default GirviItemView;