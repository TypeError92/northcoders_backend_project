const {getEndpoints} = require('./api')
const {getArticleById, getArticles} = require('./api-articles')
const {getTopics} = require('./api-topics')
const {handle400s} = require('./error-handlers')

module.exports = {
    getArticleById,
    getArticles,
    getEndpoints,
    getTopics,
    handle400s
}