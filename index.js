const config = require('./config')
const express = require('express')
const conn = require('./db/conn')
const UserRoutes = require('./routes/UserRoutes')

const app = express()

app.use(express.json())

app.use('/users', UserRoutes)

conn.sync()
    .then(() => {
        app.listen(config.port)
        console.log("server listen!")
    })
