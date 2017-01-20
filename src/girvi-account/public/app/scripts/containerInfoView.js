import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class ContainerInfoView extends ViewBase {
    
    className() {
        return '.fn-container-info';
    }

    initialize() {
        this.template = this.getTemplate(templates, '_containerInfoPartial');
        this.containerInfo = this.options.containerInfo;
    }

    serialize() {
        return {
            containerInfo: this.containerInfo
        };
    }

    afterRender() {

    }

}

export default ContainerInfoView;