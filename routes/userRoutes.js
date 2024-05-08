const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userValidation = require('../validation/userValidation/userValidation')
const authentication = require('../authentication/auth')

router.get('/home', authentication.authenticate, userController.userHome)
router.post('/signUp',userValidation.signUpValidate, userController.signUp)
router.post('/login', userValidation.loginValidate, userController.login)

module.exports = router
