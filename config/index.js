const process = require('process');

let config = {};

let env = process.env.NODE_ENV;

if (!env) {
    config = require(`./config.dev.json`);
}
else {
    config = require(`./config.${env}.json`);
}

module.exports = config;