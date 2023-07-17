const express = require('express')
const route = express.Router()
const signinController = require('./src/controllers/signinControler')
const signupController = require('./src/controllers/signupControler')
const { middlewareGlobal, checkTokenMiddleware } = require('./src/middlewares/middlewareGlobal')

route.post('/signin', signinController.signin)
route.get('/signin', checkTokenMiddleware, signinController.signin)

route.post('/signup', middlewareGlobal, signupController.signup)
route.get('/signup', signupController.signup )

module.exports = route
