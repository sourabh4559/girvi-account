import Backbone from 'backbone';
import PageLayout from './pageLayout';
import MasterView from './masterView';

class AppRouter extends Backbone.Router {

    routes() {
        return {
            "": "index",
            "girvi/:girviKey": "showGirviDetailPage",
            "addgirvi": "showAddGirviPage"
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
        this.renderMasterView().then(function(masterView) {
            masterView.showGirviSelectionView();
        });
    }

    showGirviDetailPage(girviKey) {
        this.renderMasterView().then(function(masterView) {
            masterView.showGirviDetailView(girviKey);
        });
    }

    showAddGirviPage() {
        this.renderMasterView().then(function (masterView) {
            masterView.showAddGirviView();
        });
    }

    renderMasterView() {
        var masterView = new MasterView();
        return this.pageLayout.renderView(masterView);
    }
}

export
default AppRouter;
