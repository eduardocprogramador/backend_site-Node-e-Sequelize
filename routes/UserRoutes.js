const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const checkToken = require('../utils/checkToken')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/check', UserController.check)
router.get('/:id', UserController.getById)
router.patch('/update/:id', checkToken, UserController.update)

module.exports = router