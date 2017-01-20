import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class AddGirviView extends ViewBase {

    className() {
        return 'fn-add-girvi-form';
    }

    initialize() {
        this.template = this.getTemplate(templates, '_addGirviPartial');
    }

    afterRender() {
        
    }

}

export default AddGirviView;