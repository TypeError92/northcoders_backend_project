const db = require('../db/connection')
const format = require('pg-format')

const checkExists = async (table, column, value) => {
    const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column)
    const dbOutput = await db.query(queryStr, [value])
    if (!dbOutput.rowCount){
        return Promise.reject({status: 404, msg: 'Not found'})
    }
}

module.exports = {checkExists}