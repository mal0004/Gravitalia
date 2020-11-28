'use strict';

class ReadyToShow extends require("../structures/Events") {
    constructor (window, app) {
        super(window, app, {
            name: 'ready-to-show',
            enabled: true
        });
    }

    async run() {
        this.window.show()
    }
};
module.exports = ReadyToShow;