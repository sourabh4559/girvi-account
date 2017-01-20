import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import * as firebase from 'firebase';
import GirviListView from './girviListView';

class GirviSelectionView extends ViewBase {

    className() {
        return 'fn-girvi-selection';
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
        console.log(this.villageList);
        // Sample Code - Rendering Girvi List View
        this.showGirviListView("-KaWtkZ8l3rgAO4wQoqG");
        // Sample Code - Updating Girvi List View
        window.setTimeout(() => {
            this.updateGirviListForVillage("-KaWtsjV2nKLlzWOFzGk");
        }, 2000);
    }

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