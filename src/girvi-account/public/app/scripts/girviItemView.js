import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';

class GirviItemView extends ViewBase {

    className() {
        return 'girvi-item';
    }

    events() {
        return {
            "click .fn-lnk-edit-item": "onEditLnkClick",
            "click .fn-lnk-cancel-item-changes": "onCancelLnkClick",
            "click .fn-lnk-save-item-changes": "onSaveLnkClick"
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

    // ------------------------ Event Handlers > Start ------------------------

    onEditLnkClick() {
        this.hideEditItemOptions();
        this.showSaveCancelItemOptions();
        this.showItemInEditMode();
    }

    onCancelLnkClick() {
        this.hideSaveCancelItemOptions();
        this.showEditItemOptions();
        this.showItemInReadOnlyMode();
    }

    onSaveLnkClick() {
        this.hideSaveCancelItemOptions();
        this.showEditItemOptions();
        this.showItemInReadOnlyMode();
    }

    // ------------------------ Event Handlers > End --------------------------

    showEditItemOptions() {
        this.$('.edit-item-options').removeClass('hide');
    }
    
    hideEditItemOptions() {
        this.$('.edit-item-options').addClass('hide');
    }

    showSaveCancelItemOptions() {
        this.$('.save-item-options').removeClass('hide');
    }

    hideSaveCancelItemOptions() {
        this.$('.save-item-options').addClass('hide');
    }

    showItemInReadOnlyMode() {
        this.$('.readonly-field').removeClass('hide');
        this.$('.editable-field').addClass('hide');
    }

    showItemInEditMode() {
        this.$('.readonly-field').addClass('hide');
        this.$('.editable-field').removeClass('hide');
    }

}

export default GirviItemView;