const db = require('../db/connection')

function countCommentsByArticle(article_id){
    return db.query(
        `SELECT comment_id, article_id FROM comments WHERE article_id = $1`,
        [article_id]
    ).then((result) => {
        return result.rowCount
    })
}

module.exports = {countCommentsByArticle}