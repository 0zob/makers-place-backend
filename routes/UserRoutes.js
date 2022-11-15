const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()

router.post('/register', UserController.createUser)

module.exports = router
