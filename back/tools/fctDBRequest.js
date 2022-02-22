const { Pool } = require('pg')
const settings = require('../config/database.json').settings

const pool = new Pool({
    user: settings.user,
    host: settings.host,
    database: settings.database,
    password: settings.password,
    port: settings.port,
})

function request(sql, tab) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await pool.query(sql, tab);
            //console.log(data);
            resolve(data);
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = {
    request
}