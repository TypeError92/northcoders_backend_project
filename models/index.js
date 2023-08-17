const {fetchArticleById, readArticles, updateArticleVotes} = require('./articles.models')
const {fetchComments} = require('./comments.models')
const {readTopics} = require('./topics.models')

module.exports = {
    fetchArticleById,
    readArticles,
    fetchComments,
    readTopics,
    updateArticleVotes
}