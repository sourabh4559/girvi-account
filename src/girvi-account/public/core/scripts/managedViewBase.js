import Backbone from 'backbone';

class ManagedViewBase extends Backbone.View {
    constructor(options) {
        super(options);
        this.manage = true;
    }

    manage() {
        return true;
    }
}

export
default ManagedViewBase;