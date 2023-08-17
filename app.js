const express = require('express')

const {
    getArticleById,
    getArticles,
    getEndpoints,
    getTopics,
    handle400s,
    postCommentByArticleId
} = require('./controllers')

const app = express();

app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.get('/api/topics', getTopics)

app.use(handle400s)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Internal server error'})
})

module.exports = app