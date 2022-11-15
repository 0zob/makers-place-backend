const jwt = require('jsonwebtoken')
const config = require('../config')

function createUserToken(user) {
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, config.jwtSecret)

    return token
}

module.exports = createUserToken
