const User = require('../../models/User')
const createUserToken = require('../../helpers/create-jwt-token')
const UserValidations = require('./UserValidations')
const createEncryptedPassword = require('../../helpers/create-encryptedPassword')

module.exports = class UserController {
    static async createUser(req, res) {
        const user = req.body

        const validation = await UserValidations.fieldsValidation(user)

        if (!validation.valid) {
            return res.status(422).json({ message: validation.message })
        }

        const encryptedPassword = await createEncryptedPassword(user.password)

        const userToBeCreated = new User({
            name: user.name,
            email: user.email,
            password: encryptedPassword
        })
        const newUser = await userToBeCreated.save()
        newUser.password = undefined

        const token = createUserToken(newUser)

        return res.json({ message: "user created successfully!", newUser, token })
    }
}
