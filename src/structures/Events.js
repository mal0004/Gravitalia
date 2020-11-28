module.exports = class Events {
	constructor(window, app, {
        name,
		enabled = true
	})
	{
		this.window = window;
		this.app = app;
		this.conf = {
			enabled,
			name
		};
    }

    run() {
        throw new Error(`${this.name} doesn't have a 'run' method.`);
    }
};