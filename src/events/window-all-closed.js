'use strict';

class WindowAllClosed extends require("../structures/Events") {
    constructor (window, app) {
        super(window, app, {
            name: 'window-all-closed',
            enabled: true
        });
    }

    async run() {
        if (process.platform !== 'darwin') {
            this.app.quit()
        }
    }
};
module.exports = WindowAllClosed;