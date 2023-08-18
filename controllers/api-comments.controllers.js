const {removeComment} = require('../models')

function deleteCommentById(req, res, next){
    const {comment_id} = req.params
    return removeComment(comment_id)
    .then((rows) => {
        res.status(204).send()
    })
    .catch(next)
}

module.exports = {deleteCommentById}