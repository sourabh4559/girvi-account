import ViewBase from '../common/viewBase';
import templates from '../../templates/app-templates';
import commonTemplates from '../../templates/common-templates';
import GirviItemsView from './girviItemsView';
import ContainerInfoView from './containerInfoView';
import ActivityInfoView from './activityInfoView';
import * as firebase from 'firebase';

class GirviDetailView extends ViewBase {

    className() {
        return 'fn-girvi-detail';
    }

    initialize() {
        this.headerTemplate = this.getTemplate(commonTemplates, '_headerLinkTitleAndLink');
        this.template = this.getTemplate(templates, "_girviDetailPartial");
        this.girviData = this.options.girviData;
    }

    events() {
        return {
            "click #secondary-btn": "onBackClick",
            "click .fn-lnk-edit-client-info": "onEditClientInfoClick",
            "click .fn-lnk-cancel-clientinfo-changes": "onCancelClientChangesClick",
            "click .fn-lnk-save-clientinfo-changes": "onSaveClientChangesClick",
            "click .fn-lnk-edit-girvi-info": "onEditGirviInfoClick",
            "click .fn-lnk-cancel-girviinfo-changes": "onCancelGirviChangesClick",
            "click .fn-lnk-save-girviinfo-changes": "onSaveGirviChangesClick"
        };
    }

    serialize() {
        return {
            item: this.girviData,
            headerTitle: "Girvi Detail",
            leftLinkText: "Back"
        };
    }

    afterRender() {
        this.showGirviItems(this.girviData.items);
    }

    // ------------------ Event Handlers > Start ---------------------------------

    onBackClick() {
        Backbone.history.navigate("", {
            trigger: true
        });
    }

    onEditClientInfoClick() {
        this.hideReadOnlyClientInfoSection();
        this.showEditableClientInfoSection();
        this.hideEditClientInfoLnk();
        this.showSaveCancelClientInfoLnks();
    }

    onCancelClientChangesClick() {
        this.hideEditableClientInfoSection();
        this.showReadOnlyClientInfoSection();
        this.hideSaveCancelClientInfoLnks();
        this.showEditClientInfoLnk();
    }

    onSaveClientChangesClick() {
        this.hideEditableClientInfoSection();
        this.showReadOnlyClientInfoSection();
        this.hideSaveCancelClientInfoLnks();
        this.showEditClientInfoLnk();
    }

    onEditGirviInfoClick() {
        this.hideReadOnlyGirviInfoSection();
        this.showEditableGirviInfoSection();
        this.hideEditGirviInfoLnk();
        this.showSaveCancelGirviInfoLnks();
    }

    onCancelGirviChangesClick() {
        this.hideEditableGirviInfoSection();
        this.showReadOnlyGirviInfoSection();
        this.hideSaveCancelGirviInfoLnks();
        this.showEditGirviInfoLnk();
    }

    onSaveGirviChangesClick() {
        this.hideEditableGirviInfoSection();
        this.showReadOnlyGirviInfoSection();
        this.hideSaveCancelGirviInfoLnks();
        this.showEditGirviInfoLnk();
    }

    // --------------------- Event Handlers > End -----------------------------------

    showGirviItems(girviItems) {
        var girviItemsView = new GirviItemsView({
            girviItems
        });
        this.setView('.fn-items-container', girviItemsView).render();
    }

    // --------------------- Container Info View > Start ----------------------------

    showContainerInfo(girviKey) {
        this.fetchContainerInfoData(girviKey)
            .then((containerInfoData) => {
                this.renderContainerInfoView(containerInfoData);
            });
    }

    fetchContainerInfoData(girviKey) {
        const rootRef = firebase.database().ref();
        const girviObjectsRef = rootRef.child('girviObjects');
        var handler = function(resolve, reject) {
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

    // --------------------- Container Info View > End -----------------------------

    // --------------------- Activity Info View > Start ----------------------------

    showActivityInfo(girviKey) {
        this.fetchActivityInfoData(girviKey)
            .then((activities) => {
                this.renderContainerInfoView(activities);
            });
    }

    fetchActivityInfoData(girviKey) {
        const rootRef = firebase.database().ref();
        const girviObjectsRef = rootRef.child('girviObjects');
        var handler = function(resolve, reject) {
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

    // --------------------- Activity Info View > End -------------------------------

    // --------------------- Edit/Save/Cancel Client Info > Start -------------------

    showEditableClientInfoSection() {
        this.$('.editable-client-info').removeClass('hide');
    }

    hideEditableClientInfoSection() {
        this.$('.editable-client-info').addClass('hide');
    }

    showReadOnlyClientInfoSection() {
        this.$('.readonly-client-info').removeClass('hide');
    }

    hideReadOnlyClientInfoSection() {
        this.$('.readonly-client-info').addClass('hide');
    }

    showSaveCancelClientInfoLnks() {
        this.$('.save-client-info-options').removeClass('hide');
    }

    hideSaveCancelClientInfoLnks() {
        this.$('.save-client-info-options').addClass('hide');
    }

    showEditClientInfoLnk() {
        this.$('.edit-client-info-options').removeClass('hide');
    }

    hideEditClientInfoLnk() {
        this.$('.edit-client-info-options').addClass('hide');
    }

    // --------------------- Edit/Save/Cancel Client Info > End ----------------------

    // --------------------- Edit/Save/Cancel Girvi Info > Start ----------------------

    showEditableGirviInfoSection() {
        this.$('.editable-girvi-info').removeClass('hide');
    }

    hideEditableGirviInfoSection() {
        this.$('.editable-girvi-info').addClass('hide');
    }

    showReadOnlyGirviInfoSection() {
        this.$('.readonly-girvi-info').removeClass('hide');
    }

    hideReadOnlyGirviInfoSection() {
        this.$('.readonly-girvi-info').addClass('hide');
    }

    showSaveCancelGirviInfoLnks() {
        this.$('.save-girvi-info-options').removeClass('hide');
    }

    hideSaveCancelGirviInfoLnks() {
        this.$('.save-girvi-info-options').addClass('hide');
    }

    showEditGirviInfoLnk() {
        this.$('.edit-girvi-info-options').removeClass('hide');
    }

    hideEditGirviInfoLnk() {
        this.$('.edit-girvi-info-options').addClass('hide');
    }

    // ----------------------- Edit/Save/Cancel Girvi Info > End ----------------------
}

export default GirviDetailView;