const { Router } = require('express')
const UserController = require('../controllers/User/UserController')

const router = Router()

router.post('/register', UserController.createUser)
router.post('/login', UserController.loginUser)

module.exports = router
