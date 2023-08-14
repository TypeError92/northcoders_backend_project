const db = require('../db/connection')

function readTopics(){
    return db.query(
        'SELECT * FROM topics'
    )
}

module.exports = {readTopics}