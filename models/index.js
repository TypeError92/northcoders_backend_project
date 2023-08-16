const {CheckArticleExists, fetchArticleById, readArticles} = require('./articles.models')
const {fetchComments} = require('./comments.models')
const {readTopics} = require('./topics.models')

module.exports = {
    CheckArticleExists,
    fetchArticleById,
    readArticles,
    fetchComments,
    readTopics
}