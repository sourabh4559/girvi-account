import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import GirviSelectionView from './girviSelectionView';
import GirviDetailView from './girviDetailView';
import AddGirviView from './addGirviView';
import * as firebase from 'firebase';

class MasterView extends ViewBase {

    className() {
        return "fn-master-view";
    }

    initialize() {
        this.template = this.getTemplate(templates, "_masterPartial");
    }

    // --------------- Girvi Selection View > Start ----------------------

    showGirviSelectionView() {
        this.fetchVillageList().
            then((villageList) => {
                this.renderGirviSelectionView(villageList);
            });
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

    renderGirviSelectionView(villageList) {
        var girviSelectionView = new GirviSelectionView({
            villageList
        });
        this.setView(".fn-master-content-container", girviSelectionView).render();
    }

    // --------------- Girvi Selection View > End ---------------------------


    // --------------- Girvi Detail View > Start ----------------------------

    showGirviDetailView(girviKey) {
        this.fetchGirviDetailData(girviKey)
            .then((girviData) => {
                this.renderGirviDetailView(girviData);
            });
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

    renderGirviDetailView(girviData) {
        var girviDetailView = new GirviDetailView({
            girviData
        });
        this.setView(".fn-master-content-container", girviDetailView).render();
    }

    // --------------- Girvi Detial View > End ------------------------------ 

    // --------------- Add Girvi View > Start -------------------------------

    showAddGirviView() {
        var addGirviView = new AddGirviView();
        this.setView(".fn-master-content-conatiner", addGirviView).render();
    }

    // --------------- Add Girvi View > End ---------------------------------

}

export default MasterView;