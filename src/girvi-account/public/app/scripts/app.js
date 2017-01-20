'use strict';

import Backbone from 'backbone';
import EventBus from '../core/eventBus';
import '../core/extensionMethods';
import globalEventHandlers from '../common/globalEventHandlers';
import '../common/utils';
import '../common/constant';
import '../common/busEvents';
import '../../stylesheets/index.css!';
import ApplicationLayout from './appLayout';
import AppRouter from './appRouter';
import * as firebase from 'firebase';

class Application {

    constructor() {
        this.initializeFirebase();
    }

    initializeFirebase() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBnsF9XirQSnmbQnBcV-h4I52ArhuV6Fuc",
            authDomain: "girvi-account.firebaseapp.com",
            databaseURL: "https://girvi-account.firebaseio.com",
            storageBucket: "girvi-account.appspot.com",
            messagingSenderId: "328730513412"
        };
        firebase.initializeApp(config);
    }

    run() {
        var applicationLayout, appRouter;

        applicationLayout = new ApplicationLayout();
        applicationLayout.render().then(function() {
            applicationLayout.listenTo(EventBus.defaultBus, App.BusEvents.window.close, function() {
                applicationLayout.remove();
            });

            appRouter = new AppRouter();
            appRouter.start(applicationLayout);
        });
    }
}

$(() => {
    var app = new Application();
    app.run();
});
