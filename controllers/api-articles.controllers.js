const {CheckArticleExists, fetchArticleById, readArticles, fetchComments} = require('../models')

function getArticleById(req, res, next){
    fetchArticleById(req.params.article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
}

function getArticles(req, res, next){
    readArticles()
    .then(({rows: articles}) => {
        res.status(200).send({articles})
    })
    .catch(next)
}

function getCommentsByArticleId(req, res, next){
    const article_id = req.params.article_id
    CheckArticleExists(article_id)
    .then(() => {
        return fetchComments(article_id)
    })
    .then(({rows: comments}) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

module.exports = {getArticleById, getArticles, getCommentsByArticleId}