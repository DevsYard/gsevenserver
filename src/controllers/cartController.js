const CartModel = require('../models/CartModel');

exports.cartRegister = async (req, res) => {
	try {
		const cart = await CartModel.create();
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
