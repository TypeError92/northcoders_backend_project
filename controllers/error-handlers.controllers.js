const psqlErrorCodes = {
    '22P02': {status: 400, msg: 'Bad request.'}
}

function handle400s(err, req, res, next){
    if (err.status && err.msg){
        res.status(err.status).send(({msg: err.msg}))
    } else if (err.code && psqlErrorCodes.hasOwnProperty(err.code)){
        const {status, msg} = psqlErrorCodes[err.code]
        res.status(status).send({msg})
    } else {
        next(err)
    }
}

module.exports = {handle400s}