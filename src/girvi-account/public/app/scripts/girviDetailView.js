import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import ContainerInfoView from './containerInfoView';
import ActivityInfoView from './activityInfoView';
import * as firebase from 'firebase';

class GirviDetailView extends ViewBase {

    className() {
        return 'fn-girvi-detail';
    }

    initialize() {
        this.template = this.getTemplate(templates, "_girviDetailPartial");
        this.girviData = this.options.girviData;
    }

    serialize() {
        return {
            item: this.girviData
        };
    }

    afterRender() {
    }

    // ------------------- Container Info View > Start ----------------------------

    showContainerInfo(girviKey) {
        this.fetchContainerInfoData(girviKey)
            .then((containerInfoData) => {
                this.renderContainerInfoView(containerInfoData);
            });
    }

    fetchContainerInfoData(girviKey) {
        const rootRef = firebase.database().ref();
        const girviObjectsRef = rootRef.child('girviObjects');
        var handler = function (resolve, reject) {
            girviObjectsRef.child('containerInfo').child(girviKey).once('value', function(snap) {
                resolve(snap.val());
            });
        };
        return new Promise(handler);
    }

    renderContainerInfoView(containerInfo) {
        var containerInfoView = new ContainerInfoView({
            containerInfo
        });
        this.setView('.fn-containerInfo-container', containerInfoView).render();
    }

    // ------------------- Container Info View > End -------------------------------

    // ------------------- Activity Info View > Start ----------------------------

    showActivityInfo(girviKey) {
        this.fetchActivityInfoData(girviKey)
            .then((activities) => {
                this.renderContainerInfoView(activities);
            });
    }

    fetchActivityInfoData(girviKey) {
        const rootRef = firebase.database().ref();
        const girviObjectsRef = rootRef.child('girviObjects');
        var handler = function (resolve, reject) {
            girviObjectsRef.child('activityInfo').child(girviKey).once('value', function(snap) {
                resolve(snap.val());
            });
        };
        return new Promise(handler);
    }

    renderActivityInfoView(activities) {
        var activityInfoView = new ActivityInfoView({
            activities
        });
        this.setView('.fn-activityInfo-container', activityInfoView).render();
    }

    // ------------------- Activity Info View > End -------------------------------

}

export default GirviDetailView;