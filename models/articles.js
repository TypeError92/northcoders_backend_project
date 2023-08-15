const db = require('../db/connection')

function fetchArticleById(article_id){
    return db.query(
        `
        SELECT *
        FROM articles
        WHERE article_id = $1;
        `,
        [article_id]
    )
    .then(({rows}) => {
        return rows.length ? rows[0] : Promise.reject({status: 404, msg: 'ID not found'})
    })
}

function readArticles(){
    return db.query(
        `
        SELECT author, title, article_id, topic, created_at, votes, article_img_url
        FROM articles
        `
    )
}

module.exports = {fetchArticleById, readArticles}