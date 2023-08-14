const {getEndpoints} = require('./api')
const {getArticleById} = require('./api-articles')
const {getTopics} = require('./api-topics')
const {handle400s} = require('./error-handlers')

module.exports = {
    getArticleById,
    getEndpoints,
    getTopics,
    handle400s
}