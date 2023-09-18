const express = require('express')
const route = express.Router()
const signinController = require('./src/controllers/signinController');
const signupController = require('./src/controllers/signupController');
const usersController = require('./src/controllers/usersController');
const productsController = require('./src/controllers/productsController');
const {
	middlewareGlobal,
	userSession,
	userInfo,
} = require('./src/middlewares/middlewareGlobal');

route.post('/signup', signupController.signup);

route.post('/signin', userSession, signinController.signin);

route.put('/profile', usersController.users)
route.post('/profile', usersController.profile)

route.get('/products', userInfo, productsController.showProducts);
route.post('/products', productsController.createProduct);


module.exports = route
