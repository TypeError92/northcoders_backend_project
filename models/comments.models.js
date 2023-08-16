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

module.exports = {fetchComments}