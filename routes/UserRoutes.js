const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/check', UserController.check)
router.get('/:id', UserController.getById)
router.patch('/update/:id', UserController.update)

module.exports = router