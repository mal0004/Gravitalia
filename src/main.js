const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = class MainClass {
    constructor(window, app) {
        this.window = window;
        this.app = app;
    }
    loadEvents() {
        const folders = readdirSync(join(__dirname, "events"));
        folders.forEach((e) => {
            try {
                const event = new (require((`${__dirname}/events/${e}`)))(this.window, this.app);
                if(!event.conf.enabled) {
                    return;
                } else {
                    this.app.on(event.conf.name, (...args) => event.run(...args));
                }
                delete require.cache[`./events/${event.conf.name}.js`]
            } catch (error) {
                console.error(error)
            }
        });
    }
}