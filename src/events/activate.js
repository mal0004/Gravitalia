'use strict';

class Activate extends require("../structures/Events") {
    constructor (window, app) {
        super(window, app, {
            name: 'activate',
            enabled: true
        });
    }

    async run() {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    }
};
module.exports = Activate;