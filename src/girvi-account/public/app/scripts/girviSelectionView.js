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
            "change #fn-village-selector": "onVillageSelectionChange",
            "click #primary-btn": "onAddBtnClick",  
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
        };
    }

    // -------------- Event Handlers > Start --------------------------

    onVillageSelectionChange(event) {
        var selectedVillageKey = $(event.target).val();
        this.showGirviListForVillage(selectedVillageKey);
    }

    onAddBtnClick() {
        Backbone.history.navigate(utils.createUrl("/addgirvi"), {
            trigger: true
        });
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

    showGirviListForVillage(villageKey) {
        this.fetchVillageGirviList(villageKey)
            .then((villageGirviList) => {
                let girviListView = this.getView('.fn-girvi-list-container');
                if (!girviListView) {
                    this.renderGirviListView(villageGirviList);
                } else {
                    girviListView.girviList = villageGirviList;
                    girviListView.render();
                }
            });
    }

}

export default GirviSelectionView;