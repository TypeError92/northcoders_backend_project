const express = require('express')

const {
    getArticleById,
    getArticles,
    getCommentsByArticleId,
    getEndpoints,
    getTopics,
    handle400s,
    patchArticleVotes
} = require('./controllers')

const app = express();

app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.patch('/api/articles/:article_id', patchArticleVotes)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.get('/api/topics', getTopics)

app.use(handle400s)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Internal server error'})
})

module.exports = app