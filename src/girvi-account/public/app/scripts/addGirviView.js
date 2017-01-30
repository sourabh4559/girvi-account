import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import commonTemplates from '../../templates/common-templates';
import * as firebase from 'firebase';

class AddGirviView extends ViewBase {

    className() {
        return 'fn-add-girvi-form';
    }

    events() {
        return {
            "click #btn-add-girvi": "onAddGirviBtnClick",
            "click #secondary-btn": "onBackClick",
            "change #fn-village-selector": "onVillageSelectionChange",
        };
    }

    initialize() {
        this.headerTemplate = this.getTemplate(commonTemplates, '_headerLinkTitleAndLink');
        this.template = this.getTemplate(templates, '_addGirviPartial');
        this.villageList = this.options.villageList;
    }

    serialize() {
        return {
            villageList: this.villageList,
            headerTitle: "Add Girvi",
            leftLinkText: "Back"
        };
    }

    onBackClick() {
        Backbone.history.navigate("", {
            trigger: true
        });
    }

    // ------------------ Event Handlers > Start ----------------------

    onVillageSelectionChange(event) {
        this.showAddGirviSection();
    }

    onAddGirviBtnClick(event) {
        event.preventDefault();

        var girviKey;
        var girviName = this.$('input[name="name"]').val();
        var girviAmt = this.$('input[name="amount"]').val();
        var girviStartDate = this.$('input[name="startDate"]').val();
        var villageKey = this.$('#fn-village-selector').val();

        const rootRef = firebase.database().ref();
        const girvisRef = rootRef.child("girvis");
        var newGirviRef = girvisRef.push({
            name: girviName,
            amount: girviAmt,
            startDate: girviStartDate,
            village: villageKey
        }, (error) => {
            if (error) {
                console.log("Error");
            } else {
                const villageGirviRef = rootRef.child("villageObjects").child("girvis").child(villageKey);
                villageGirviRef.push({
                    name: girviName,
                    amount: girviAmt,
                    startDate: girviStartDate,
                    girviKey: newGirviRef.key
                }, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        Backbone.history.navigate("/", {
                            trigger: true
                        });
                    }
                });
            }
        });
    }

    // ------------------ Event Handlers > End ------------------------

    showAddGirviSection() {
        this.$(".new-girvi-info-section").showElement();
    }
}

export default AddGirviView;