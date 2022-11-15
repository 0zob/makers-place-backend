const User = require('../../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../../helpers/create-jwt-token')
const UserValidations = require('./UserValidations')

module.exports = class UserController {
    static async createUser(req, res) {
        const user = req.body

        const validation = await UserValidations.fieldsValidation(user)
        console.log(validation)

        if (!validation.valid) {
            return res.status(422).json({ message: validation.message })
        }

        const salt = await bcrypt.genSalt(12)

        const encryptedPassword = await bcrypt.hash(user.password, salt)

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
