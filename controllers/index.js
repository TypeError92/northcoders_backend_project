const {getEndpoints} = require('./api.controllers')

const {
    getArticleById,
    getArticles,
    getCommentsByArticleId,
    patchArticleVotes,
    postCommentByArticleId
} = require('./api-articles.controllers')

const {getUsers} = require('./api-users.constrollers')

const {getTopics} = require('./api-topics.controllers')
const {handle400s} = require('./error-handlers.controllers')


module.exports = {
    getArticleById,
    getArticles,
    getCommentsByArticleId,
    getEndpoints,
    getTopics,
    getUsers,
    handle400s,
    patchArticleVotes,
    postCommentByArticleId
}