const express = require('express')

const app = express();
app.use(express.json())

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Internal server error'})
})

module.exports = app