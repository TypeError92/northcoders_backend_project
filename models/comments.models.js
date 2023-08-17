const {checkExists} = require('./utils.models')
const db = require('../db/connection')

function fetchComments(article_id){
    return checkExists('articles', 'article_id', article_id)
    .then(() => {
        return db.query(
            `
            SELECT
                comment_id,
                votes,
                created_at,
                author,
                body,
                article_id
            FROM comments
            WHERE article_id = $1
            ORDER BY created_at DESC;
            `,
            [article_id]
        )
    }) 
    
}

function insertComment(body, article_id, author){
    if (typeof author !== 'string' || typeof body !== 'string'){
        return Promise.reject({
            status: 400,
            msg: 'Bad request.'
        })
    }
    return checkExists('users', 'username', author)
    .then(() => {
        return db.query(`
    INSERT INTO comments (
        body,
        article_id,
        author
    )
    VALUES ($1, $2, $3)
    RETURNING *;
        `,
        [body,article_id, author])
    })
}

function removeComment(comment_id){
    return checkExists('comments', 'comment_id', comment_id)
    .then(() => {
        return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;
        `, [comment_id])
    })
    .then(({rows}) => {
        return rows.length ? rows : Promise.reject({status: 404, msg: 'Not found.'})
    })
}

module.exports = {fetchComments, insertComment, removeComment}



