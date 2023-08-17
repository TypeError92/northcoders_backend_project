const {fetchArticleById, readArticles, fetchComments, insertComment} = require('../models')

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
    return fetchComments(req.params.article_id)
    .then(({rows: comments}) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

function postCommentByArticleId(req, res, next){
    const {article_id} = req.params
    const {username, body} = req.body
    insertComment(body, article_id, username)
    .then(({rows}) => {
        res.status(201).send({new_comment: rows[0]})
    })
    .catch(next)

}

module.exports = {getArticleById, getArticles, getCommentsByArticleId, postCommentByArticleId}