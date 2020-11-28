const express = require('express');
const router = express.Router();
const { readdirSync, readFileSync, readFile } = require("fs");
const { join } = require("path");
let modules = [];

function getBase64(file) {
    return new Buffer(readFileSync(file)).toString('base64');
}
readdirSync(join(__dirname+"/modules")).forEach((t) => {
    try {
        modules.push({
            name: require(`./modules/${t}/content.json`).name ?? "Unknow Name",
            description: require(`./modules/${t}/content.json`).description ?? "This package doesn't have any description",
            badge: require(`./modules/${t}/content.json`).badge ?? null,
            icon: require(`./modules/${t}/content.json`).icon ? "data:image/png;base64,"+getBase64(join(__dirname+"/modules"+`/${t}${require(`./modules/${t}/content.json`).icon}`)) : null,
            url: `/${require(`./modules/${t}/content.json`).name ?? t.replace(" ", "")}`,
            author: require(`./modules/${t}/content.json`).author ?? "Unknown"
        })
        router.get(`/${require(`./modules/${t}/content.json`).name ?? t}`, function(req, res) {
            if(!require(`./modules/${t}/content.json`).path) {
                res.render("unknown-file.ejs", {
                    name: "Gravitalia",
                    projectName: require(`./modules/${t}/content.json`).name ?? "Unknow Name"
                });
            } else {
                res.send(readFileSync(join(__dirname+`/modules/${t}${require(`./modules/${t}/content.json`).path}`), {encoding: "utf-8"}))
            }
        })
    } catch (e) {
        return;
    }
});
router.get("/", function(req, res) {
    res.render("index.ejs", {
        name: "Gravitalia",
        modules
    });
})

module.exports = router;