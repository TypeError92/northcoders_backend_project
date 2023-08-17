const {checkExists} = require('./utils.models')

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
        return rows.length ? rows[0] : Promise.reject({status: 404, msg: 'Resource not found.'})
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

function updateArticleVotes(inc_votes, article_id){
    return checkExists('articles', 'article_id', article_id)
    .then(() => {
        return db.query(
            `
            UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;
            `, [
                inc_votes,
                article_id
            ])
    })
}


module.exports = {fetchArticleById, readArticles, updateArticleVotes}