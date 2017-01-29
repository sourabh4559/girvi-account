import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import GirviSelectionView from './girviSelectionView';
import GirviDetailView from './girviDetailView';
import AddGirviView from './addGirviView';
import AddVillageView from './addVillageView';
import * as firebase from 'firebase';

class MasterView extends ViewBase {

    className() {
        return "fn-master-view";
    }

    initialize() {
        this.template = this.getTemplate(templates, "_masterPartial");
    }

    showGirviSelectionView() {
        this.fetchVillageList().
            then((villageList) => {
                this.renderGirviSelectionView(villageList);
            });
    }

    renderGirviSelectionView(villageList) {
        var girviSelectionView = new GirviSelectionView({
            villageList
        });
        this.setView(".fn-master-content-container", girviSelectionView).render();
    }

    showGirviDetailView(girviKey) {
        this.fetchGirviDetailData(girviKey)
            .then((girviData) => {
                this.renderGirviDetailView(girviData);
            });
    }

    renderGirviDetailView(girviData) {
        var girviDetailView = new GirviDetailView({
            girviData
        });
        this.setView(".fn-master-content-container", girviDetailView).render();
    }

    showAddGirviView() {
        this.fetchVillageList().
            then((villageList) => {
                var addGirviView = new AddGirviView({
                    villageList
                });
                this.setView(".fn-master-content-container", addGirviView).render();
            });
    }

    showAddVillageView() {
        var addVillageView = new AddVillageView();
        this.setView(".fn-master-content-container", addVillageView).render();
    }

    fetchVillageList() {
        const rootRef = firebase.database().ref();
        const villagesRef = rootRef.child("villages");
        var handler = function (resolve, reject) {
            villagesRef.once("value", (snap) => {
                resolve(snap.val());
            });
        };
        return new Promise(handler);
    }

    fetchGirviDetailData(girviKey) {
        const rootRef = firebase.database().ref();
        const girvisRef = rootRef.child("girvis");
        var handler = function (resolve, reject) {
            girvisRef.child(girviKey).once("value", (snap) => {
                resolve(snap.val());
            });
        };
        return new Promise(handler);
    }

}

export default MasterView;