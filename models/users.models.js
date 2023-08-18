const db = require('../db/connection')

function readUsers(){
    return db.query(
        `
        SELECT *
        FROM users
        `
    )
}

module.exports = {readUsers}