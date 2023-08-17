const {removeComment} = require('../models')

function deleteCommentById(req, res, next){
    const {comment_id} = req.params
    return removeComment(comment_id)
    .then((rows) => {
        console.log(rows)
        res.status(204).send()
    })
}

module.exports = {deleteCommentById}