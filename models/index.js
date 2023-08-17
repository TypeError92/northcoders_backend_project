const {fetchArticleById, readArticles, updateArticleVotes} = require('./articles.models')
const {fetchComments, insertComment} = require('./comments.models')
const {readTopics} = require('./topics.models')

module.exports = {
    fetchArticleById,
    insertComment,
    readArticles,
    fetchComments,
    readTopics,
    updateArticleVotes
}