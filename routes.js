const express = require('express')
const route = express.Router()
const signinController = require('./src/controllers/signinController');
const signupController = require('./src/controllers/signupController');
const usersController = require('./src/controllers/usersController');
const productsController = require('./src/controllers/productsController');
const {
	middlewareGlobal,
	isAuthenticated,
	userSession,
} = require('./src/middlewares/middlewareGlobal');

route.post('/signup', userSession, signupController.signup);

route.post('/signin', signinController.signin);
// route.get('/signin/:id', signinController.signinById);

// route.get('/users', usersController.users);

route.get('/products', productsController.showProducts);
route.post('/products', productsController.createProduct);


module.exports = route
