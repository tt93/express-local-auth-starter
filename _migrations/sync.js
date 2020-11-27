const getDataContext = require('../data/get-db-context');
const bcrypt = require('bcrypt');

async function run() {
    const sql = await getDataContext();
    await sql.sync({ alter: true });

}

run();