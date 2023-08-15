const {
    fetchArticleById,
    readArticles
} = require('../models')

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
        for (const article of articles)
        articles.sort((a, b) => b.created_at - a.created_at)
        res.status(200).send({articles})
    })
    .catch(next)
}

module.exports = {getArticleById, getArticles}