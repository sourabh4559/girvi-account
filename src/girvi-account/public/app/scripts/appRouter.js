import Backbone from 'backbone';
import PageLayout from './pageLayout';
import MasterView from './masterView';
import Enum from '../common/enum';

class AppRouter extends Backbone.Router {

    routes() {
        return {
            "": "index",
            "girvi/:girviKey": "showGirviDetailPage",
            "addgirvi": "showAddGirviPage",
            "addvillage": "showAddVillagePage"
        };
    }

    start(applicationLayout) {
        this.pageLayout = new PageLayout();
        applicationLayout.setView(this.pageLayout).render().then(function() {
            Backbone.history.start();
        });
    }
    
    index() {
        this.showGirviSelectionView();
    }

    showGirviSelectionView() {
        this.renderMasterView(Enum.animateDirection.leftToRight).then(function(masterView) {
            masterView.showGirviSelectionView();
        });
    }

    showGirviDetailPage(girviKey) {
        this.renderMasterView(Enum.animateDirection.rightToLeft).then(function(masterView) {
            masterView.showGirviDetailView(girviKey);
        });
    }

    showAddGirviPage() {
        this.renderMasterView(Enum.animateDirection.rightToLeft).then(function (masterView) {
            masterView.showAddGirviView();
        });
    }

    showAddVillagePage() {
        this.renderMasterView(Enum.animateDirection.rightToLeft).then(function (masterView) {
            masterView.showAddVillageView();
        });
    }

    renderMasterView(animateDirection) {
        var masterView = new MasterView();
        return this.pageLayout.renderView(masterView, animateDirection);
    }
}

export
default AppRouter;
