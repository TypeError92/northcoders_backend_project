const db = require('../db/connection')

function CheckArticleExists(article_id){
    return db.query(
        `
        SELECT *
        FROM articles
        WHERE article_id = $1;
        `,
        [article_id]
    )
    .then(({rowCount}) => {
        if (!rowCount){
            return Promise.reject({ status: 404, msg: 'Resource not found' })
        }

    })
}

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
        return rows.length ? rows[0] : Promise.reject({status: 404, msg: 'Resource not found'})
    })
}

function readArticles(){
    return db.query(
        `
        SELECT
            articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.article_id)::int AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC
        `
    )
}

module.exports = {CheckArticleExists, fetchArticleById, readArticles}