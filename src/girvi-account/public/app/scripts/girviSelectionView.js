import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import * as firebase from 'firebase';
import GirviListView from './girviListView';

class GirviSelectionView extends ViewBase {

    className() {
        return 'fn-girvi-selection';
    }

    events() {
        return {
            "change #fn-village-selector": "onVillageSelectionChange"
        };
    }

    initialize() {
        this.template = this.getTemplate(templates, '_girviSelectionPartial');
        this.villageList = this.options.villageList;
    }

    serialize() {
        return {
            villageList: this.villageList
        };
    }

    afterRender() {
        var selectedVillageKey = this.$('#fn-village-selector').val();
        this.showGirviListView(selectedVillageKey);
    }

    // -------------- Event Handlers > Start --------------------------

    onVillageSelectionChange(event) {
        var selectedVillageKey = $(event.target).val();
        this.updateGirviListForVillage(selectedVillageKey);
    }

    // -------------- Event Handlers > End ----------------------------

    showGirviListView(villageKey) {
        this.fetchVillageGirviList(villageKey)
            .then((villageGirviList) => {
                this.renderGirviListView(villageGirviList);
            });
    }

    fetchVillageGirviList(villageKey) {
        const rootRef = firebase.database().ref();
        const villageObjectsRef = rootRef.child('villageObjects');
        var handler = function (resolve, reject) {
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

}

export default GirviSelectionView;