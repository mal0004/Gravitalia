const express = require("express");
const app = express();
const { join } = require("path");

module.exports = class Express {
    constructor(window, app) {
        this.window = window;
        this.app = app;
        this.server = null;
    }

    /**
     * Load all express files and launch it
     * @returns {Promise} Return a promise
     */
    load() {
        new Promise((resolve, reject) => {
            app
            .engine("html", require("ejs").renderFile)
            .use(express.static(join(__dirname.replace("\helpers", ""), "/public")))
            .set("view engine", "ejs")
            .set("views", join(__dirname.replace("\helpers", ""), "views"))
            .set('port', 4506)
            .use(express.json())
            .use((req, res, next) => {
              res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
              res.setHeader('Access-Control-Allow-Credentials', true);
              req.config = require("../data");
              next();
            })
            .use("/", require("./router/index"))
            .get("*", function(req, res) {
              res.redirect("/");
            });
    
            this.server = app.listen(app.get('port'), (err) => {
                if(err) reject(err)
                else resolve(app.get('port'))
            })
            resolve(app.get('port'))
        })
    }

    /**
     * Stop the express server
     * @returns
     */
    stop() {
        if(this.server) return;
        this.server.close()
    }
}