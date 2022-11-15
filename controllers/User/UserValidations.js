const User = require('../../models/User')
const bcrypt = require('bcrypt')

module.exports = class UserValidations {
    static async registerValidation(user) {
        if (!user.name) {
            return { message: "name field is required", statusCode: 422, isValid: false }
        }
        if (!user.email) {
            return { message: "email field is required", statusCode: 422, isValid: false }
        }
        if (!user.password) {
            return { message: "password field is required", statusCode: 422, isValid: false }
        }
        if (!user.confirmPassword) {
            return { message: "confirmPassword field is required", statusCode: 422, isValid: false }
        }

        const userExists = await User.findOne({ where: { email: user.email } })

        if (userExists) {
            return { message: "a user with this email already exists", statusCode: 422, isValid: false }
        }

        if (user.password !== user.confirmPassword) {
            return { message: "passsword field not equal to confirmPassword field", statusCode: 422, isValid: false }
        }

        return { isValid: true }
    }

    static async loginValidation(user) {
        if (!user.email) {
            return { message: "email field is required",statusCode: 422 , isValid: false }
        }

        if (!user.password) {
            return { message: "password field is required",statusCode: 422 , isValid: false }
        }

        const userInDb = await User.findOne({ where: { email: user.email } })

        if (!userInDb) {
            return { message: "user not exists",statusCode: 422 , isValid: false }
        }

        const checkPassword = await bcrypt.compare(user.password, userInDb.password)

        if (!checkPassword) {
            return { message: "email or passsword incorrect",statusCode: 401, isValid: false }
        }

        return { isValid: true }
    }
}
