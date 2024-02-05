const express = require('express')
const route = express.Router()
const signinController = require('./src/controllers/signinController');
const signupController = require('./src/controllers/signupController');
const usersController = require('./src/controllers/usersController');
const cartController = require('./src/controllers/cartController');
const productsController = require('./src/controllers/productsController');
const favoritesController = require('./src/controllers/favoritesController');
const { userSession, userInfo } = require('./src/middlewares/middlewareGlobal');
const {
	userAdminConfirmation,
} = require('./src/middlewares/middlewareDeleteProd');

route.post('/signup', signupController.signup);

route.post('/signin', userSession, signinController.signin);

route.put('/profile', userInfo, usersController.users);
route.post('/profile', userInfo, usersController.profile);

route.post('/showfavorites', userInfo, favoritesController.getFavorites);
route.post('/favorites', favoritesController.createFavorites);

route.get('/products', userInfo, productsController.showProducts);
route.post('/products', productsController.createProduct);
route.delete(
	'/products',
	userAdminConfirmation,
	productsController.deleteProduct
);

route.get('/cart', userSession, cartController.cartView);
route.post('/cart', userSession, cartController.cartRegister);

route.get('/product', productsController.getProduct);
route.get('/product/details/:id', productsController.productDetails);
route.put('/product/edit/:id', productsController.editProduct);


module.exports = route
	