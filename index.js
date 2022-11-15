const config = require('./config')
const express = require('express')
const conn = require('./db/conn')

const app = express()

conn.sync()
    .then(() => {
        app.listen(config.port)
        console.log("server listen!")
    })
