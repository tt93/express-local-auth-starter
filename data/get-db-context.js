const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('../config');
const initModels = require('./init-models');

let dataContext;

/**
 * 
 * Replace or add provider for other db when going to production
 */
async function getDataContextSqlite() {
    return new Promise(async (res) => {
        if (!dataContext) {
            dataContext = new Sequelize({
                dialect: 'sqlite',
                storage: path.join(__dirname, 'tmp/db.sqlite')
            });
            await initModels(dataContext);
        }
        res(dataContext);
    })
}

async function getDataContext() {
    if (config.prod) {
        throw new Error('No production db yet');
    }
    return getDataContextSqlite();
}

module.exports = getDataContext;