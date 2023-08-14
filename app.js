const express = require('express')

const {
    getArticleById,
    getEndpoints,
    getTopics
} = require('./controllers')

const app = express();

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/topics', getTopics)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Internal server error'})
})

module.exports = app