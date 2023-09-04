const cors = require('cors')
const express = require('express')

const {
    deleteCommentById,
    getArticleById,
    getArticles,
    getCommentsByArticleId,
    getEndpoints,
    getTopics,
    getUsers,
    handle400s,
    patchArticleVotes,
    postCommentByArticleId
} = require('./controllers')

const app = express();

app.use(cors())
app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.patch('/api/articles/:article_id', patchArticleVotes)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.get('/api/users', getUsers)

app.get('/api/topics', getTopics)

app.use(handle400s)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Internal server error'})
})

module.exports = app