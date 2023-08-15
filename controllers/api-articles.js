const {countCommentsByArticle,
    fetchArticleById,
    readArticles} = require('../models')

function getArticleById(req, res, next){
    const {article_id} = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
}

function getArticles(req, res, next){
    readArticles()
    .then(({rows: articles}) => {
        return Promise.all(articles.map((article) => {
            return countCommentsByArticle(article.article_id)
            .then((comment_count) => {
                article.comment_count = comment_count
                return article
            })
        }))
    }).then((articles) => {
        articles.sort((a, b) => b.created_at - a.created_at)
        res.status(200).send({articles})
    })
    .catch(next)
}

module.exports = {getArticleById, getArticles}