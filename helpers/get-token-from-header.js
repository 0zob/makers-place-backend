function getTokenFromHeader(req) {
    if (!req.headers.authorization) {
        return null
    }
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]

    return token
}

module.exports = getTokenFromHeader
