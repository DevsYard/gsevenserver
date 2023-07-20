const express = require('express')
const route = express.Router()
const signinController = require('./src/controllers/signinControler')
const signupController = require('./src/controllers/signupControler')
const { middlewareGlobal, checkTokenMiddleware } = require('./src/middlewares/middlewareGlobal')


route.post('/signup', middlewareGlobal, signupController.signup);

route.get('/signin', signinController.signin);
// route.post('/signin', signinController.signin);

module.exports = route
