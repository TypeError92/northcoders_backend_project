const {fetchArticleById, readArticles} = require('./articles')
const {insertComment} = require('./comments.models')
const {readTopics} = require('./topics')

module.exports = {
    fetchArticleById,
    insertComment,
    readArticles,
    readTopics
}