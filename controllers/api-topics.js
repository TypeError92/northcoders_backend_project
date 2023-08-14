const {readTopics} = require('../models')

function getTopics(req, res, next){
    readTopics()
    .then(({rows}) => {
        return res.status(200).send(rows)
    })
    .catch(next)
}

module.exports = {getTopics}