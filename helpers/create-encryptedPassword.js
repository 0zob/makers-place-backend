const bcrypt = require('bcrypt')

async function createEncryptedPassword(password) {
    const salt = await bcrypt.genSalt(12)
    const encryptedPassword = await bcrypt.hash(password, salt)

    return encryptedPassword
}

module.exports = createEncryptedPassword
