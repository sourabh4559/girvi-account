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
            "keyup #search-village-textbox": "showVillageList",
            "keypress #search-village-textbox": "showVillageList",
            "click .fn-village": "onVillageSelection"
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

    onVillageSelection(event) {
        var selectedVillageKey = $(event.target).attr("value");
        this.$("#search-village-textbox").val($(event.target).attr("data-village-name"));
        this.$('#fn-village-selector').val(selectedVillageKey);
        this.hideVillageList();
        this.showAddGirviSelection();
    }

    showAddGirviSelection() {
        this.$(".new-girvi-info-section").showElement();
    }
    hideAddGirviSelection() {
        this.$(".new-girvi-info-section").hideElement();
    }

    showVillageList() {
        var villageName = this.$("#search-village-textbox").val().trim().toLowerCase();
        this.hideAddGirviSelection();
        if (villageName) {
            this.showMatchedVillages(villageName);
        } else {
            this.hideVillageList();
        }
    }

    showMatchedVillages(villageName) {
        var villageList = this.$(".fn-villages-datalist-container .village-item");
        this.hideVillageList();
        this.$(".fn-villages-datalist-container").addClass('show-villages-datalist-container').showElement();
        villageList.each((item) => {
            if (this.$(villageList[item]).find('.fn-village').data('village-name').toLowerCase().indexOf(villageName) > -1) {
                this.$(villageList[item]).showElement();
            }
        });
    }

    hideVillageList() {
        this.$(".fn-villages-datalist-container .village-item").hideElement();
    }

}

export default AddGirviView;