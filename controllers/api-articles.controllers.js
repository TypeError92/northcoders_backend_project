const {
    fetchArticleById,
    readArticles,
    fetchComments,
    updateArticleVotes
} = require('../models')

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

function patchArticleVotes(req, res, next){
    const {inc_votes} = req.body
    const {article_id} = req.params
    updateArticleVotes(inc_votes, article_id)
    .then(({rows}) => {
        console.log(rows)
        res.status(200).send({article: rows[0]})
    })
    .catch(next)
}

module.exports = {getArticleById, getArticles, getCommentsByArticleId, patchArticleVotes}