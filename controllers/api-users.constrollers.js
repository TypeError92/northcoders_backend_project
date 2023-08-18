const {readUsers} = require('../models')

function getUsers(req, res, next){
    readUsers()
    .then(({rows: users}) => {
        res.status(200).send({users})
    })
    .catch(next)
}

module.exports = {getUsers}