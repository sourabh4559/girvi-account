'use strict';

import Backbone from 'backbone';

var EventBus = {};
EventBus.defaultBus = _.extend({}, Backbone.Events);

export default EventBus;