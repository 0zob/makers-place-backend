const jwt = require('jsonwebtoken');
const config = require("../config");
const getTokenFromHeader = require("../helpers/get-token-from-header");

function verifyToken(req, res, next) {
    const token = getTokenFromHeader(req)

    if (!token) {
        return res.status(401).json({ message: "access denied" })
    }

    try {
        const verified = jwt.verify(token, config.jwtSecret)
        req.user = verified
        next()
    }
    catch (error) {
        return res.status(401).json({ message: "access denied" })
    }
}

module.exports = verifyToken
