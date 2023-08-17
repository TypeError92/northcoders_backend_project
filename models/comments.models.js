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
        console.log(`users.username "${author}" exists.`)
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

module.exports = {fetchComments, insertComment}



