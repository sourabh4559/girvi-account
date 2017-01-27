import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import * as firebase from 'firebase';
import commonTemplates from '../../templates/common-templates';
import GirviListView from './girviListView';
import utils from '../common/utils';

class GirviSelectionView extends ViewBase {

    className() {
        return 'fn-girvi-selection';
    }

    events() {
        return {
            "click .fn-village": "onVillageSelection",
            "keyup #search-village-textbox": "showVillageList",
            "keypress #search-village-textbox": "showVillageList",
            "click #primary-btn": "addGirvi"
        };
    }

    initialize() {
        this.headerTemplate = this.getTemplate(commonTemplates, '_headerLinkTitleAndLink');
        this.template = this.getTemplate(templates, '_girviSelectionPartial');
        this.villageList = this.options.villageList;
    }

    serialize() {
        return {
            headerTitle: "Girvi List",
            rightLinkText: 'Add',
            villageList: this.villageList,
            searchVillageWatermark: "Search Girvi Village"
        };
    }

    afterRender() {
        this.renderGirviListView();
    }

    // -------------- Event Handlers > Start --------------------------

    onVillageSelection(event) {
        var selectedVillageKey = $(event.target).attr("value");
        this.$("#search-village-textbox").val($(event.target).attr("data-village-name"));
        this.hideVillageList();
        this.updateGirviListForVillage(selectedVillageKey);
    }

    // -------------- Event Handlers > End ----------------------------

    fetchVillageGirviList(villageKey) {
        const rootRef = firebase.database().ref();
        const villageObjectsRef = rootRef.child('villageObjects');
        var handler = function(resolve, reject) {
            villageObjectsRef.child('girvis').child(villageKey).once('value', function(snap) {
                resolve(snap.val());
            });
        };
        return new Promise(handler);
    }

    renderGirviListView(girviList) {
        var girviListView = new GirviListView({
            girviList
        });
        this.setView('.fn-girvi-list-container', girviListView).render();
    }

    updateGirviListForVillage(villageKey) {
        this.fetchVillageGirviList(villageKey)
            .then((villageGirviList) => {
                let girviListView = this.getView('.fn-girvi-list-container');
                girviListView.girviList = villageGirviList;
                girviListView.render();
            });
    }

    showVillageList() {
        var villageName = this.$("#search-village-textbox").val().trim().toLowerCase();
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

    addGirvi() {
        Backbone.history.navigate(utils.createUrl("/addgirvi"), {
            trigger: true
        });
    }

}

export default GirviSelectionView;