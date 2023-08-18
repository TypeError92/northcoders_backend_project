const {fetchArticleById, readArticles, updateArticleVotes} = require('./articles.models')
const {fetchComments, insertComment, removeComment} = require('./comments.models')
const {readTopics} = require('./topics.models')

module.exports = {
    fetchArticleById,
    insertComment,
    readArticles,
    fetchComments,
    readTopics,
    removeComment,
    updateArticleVotes
}