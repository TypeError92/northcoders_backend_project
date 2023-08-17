const db = require('../db/connection')
const format = require('pg-format')

function insertComment(article_id, new_comment){
    console.log('Inside the model')
    console.log(new_comment.body, article_id, new_comment.username)
    return db.query(`
    INSERT INTO comments (
        body,
        article_id,
        author
    )
    VALUES ($1, $2, $3)
    RETURNING *;
        `, [new_comment.body, article_id, new_comment.username])


}

module.exports = {insertComment}