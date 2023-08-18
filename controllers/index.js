const {getEndpoints} = require('./api.controllers')

const {
    getArticleById,
    getArticles,
    getCommentsByArticleId,
    patchArticleVotes,
    postCommentByArticleId
} = require('./api-articles.controllers')

const {deleteCommentById} = require('./api-comments.controllers')

const {getTopics} = require('./api-topics.controllers')
const {handle400s} = require('./error-handlers.controllers')


module.exports = {
    deleteCommentById,
    getArticleById,
    getArticles,
    getCommentsByArticleId,
    getEndpoints,
    getTopics,
    handle400s,
    patchArticleVotes,
    postCommentByArticleId
}