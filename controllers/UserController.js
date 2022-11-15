const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-jwt-token')

module.exports = class UserController {
    static async createUser(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        if (!name) {
            return res.status(422).json({ message: "name field is required" })
        }
        if (!email) {
            return res.status(422).json({ message: "email field is required" })
        }
        if (!password) {
            return res.status(422).json({ message: "password field is required" })
        }
        if (!confirmPassword) {
            return res.status(422).json({ message: "confirmPassword field is required" })
        }

        const userExists = await User.findOne({ where: { email: email } })

        if (userExists) {
            return res.status(422).json({ message: "a user with that email already exists" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "passsword field not equal to confirmPassword field" })
        }

        const salt = await bcrypt.genSalt(12)

        const encryptedPassword = await bcrypt.hash(password, salt)

        const userToBeCreated = new User({
            name,
            email,
            password: encryptedPassword
        })

        const newUser = await userToBeCreated.save()

        newUser.password = undefined

        const token = createUserToken(newUser)

        return res.json({ message: "user created successfully!", newUser, token })
    }
}
