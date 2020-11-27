const fs = require('fs');
const path = require('path');

let run = false;
module.exports = async (sql) => {
    if (run === true) {
        throw new Error('The init-models.js function ran more than once. investigate problem');
    }
    const normalizedPath = path.join(__dirname, "models");
    const dir = fs.readdirSync(normalizedPath);
    let modelBuilders = []
    for (let file of dir) {
        modelBuilders.push(require(path.join(normalizedPath, file)))
    }
    for (let mb of modelBuilders) {
        if (mb.init) {
            mb.init(sql);
        }
    }
    for (let mb2 of modelBuilders) {
        if (mb2.createRelationships) {
            mb2.createRelationships(sql);
        }
    }
    run = true;
}