import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import * as firebase from 'firebase';

class AddVillageView extends ViewBase {

    className() {
        return 'fn-add-village';
    }

    events() {
        return {
            "click #btn-add-village": "onAddVillageClick"
        };
    }

    initialize() {
        this.template = this.getTemplate(templates, "_addVillagePartial");
    }

    // -------------------- Event Handlers > Start  --------------------

    onAddVillageClick(event) {
        event.preventDefault();

        var villageName = this.$('input[name="name"]').val();
        const rootRef = firebase.database().ref();
        const villagesRef = rootRef.child("villages");
        villagesRef.push({
            name: villageName
        });
    }

    // -------------------- Event Handlers > End -----------------------

}

export default AddVillageView;