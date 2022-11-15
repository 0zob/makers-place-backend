const { Router } = require('express')
const UserController = require('../controllers/User/UserController')
const verifyToken = require('../middlewares/verify-token')

const router = Router()

router.post('/register', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/:id', verifyToken, UserController.getUserById)

module.exports = router
