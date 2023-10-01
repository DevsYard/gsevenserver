const express = require('express')
const route = express.Router()
const signinController = require('./src/controllers/signinController');
const signupController = require('./src/controllers/signupController');
const usersController = require('./src/controllers/usersController');
const productsController = require('./src/controllers/productsController');
const favoritesController = require('./src/controllers/favoritesController');
const { userSession, userInfo } = require('./src/middlewares/middlewareGlobal');

route.post('/signup', signupController.signup);

route.post('/signin', userSession, signinController.signin);

route.put('/profile', userInfo, usersController.users);
route.post('/profile', userInfo, usersController.profile);

route.post('/favorites', favoritesController.favorites);

route.get('/products', productsController.showProducts);
route.post('/products', productsController.createProduct);

route.get('/product/details/:id', productsController.productDetails);


module.exports = route
