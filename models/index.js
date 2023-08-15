const {countCommentsByArticle} = require('./comments')
const {fetchArticleById, readArticles} = require('./articles')
const {readTopics} = require('./topics')

module.exports = {
    countCommentsByArticle,
    fetchArticleById,
    readArticles,
    readTopics
}