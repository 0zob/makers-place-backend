const User = require('../../models/User')

module.exports = class UserValidations {
    static async fieldsValidation(user){
        if (!user.name) {
            return { message: "name field is required", valid: false }
        }
        if (!user.email) {
            return { message: "email field is required", valid: false }
        }
        if (!user.password) {
            return { message: "password field is required", valid: false }
        }
        if (!user.confirmPassword) {
            return { message: "confirmPassword field is required", valid: false }
        }

        const userExists = await User.findOne({ where: { email: user.email } })

        if (userExists) {
            return { message: "a user with this email already exists", valid: false }
        }

        if (user.password !== user.confirmPassword) {
            return { message: "passsword field not equal to confirmPassword field", valid: false }
        }

        return {valid: true}
    }
}
