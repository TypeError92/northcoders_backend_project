const {getEndpoints} = require('./api')
const {getArticleById} = require('./api-articles')
const {getTopics} = require('./api-topics')

module.exports = {
    getArticleById,
    getEndpoints,
    getTopics
}