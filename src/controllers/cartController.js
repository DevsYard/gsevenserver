const CartModel = require('../models/CartModel');

exports.cartRegister = async (req, res) => {
	try {
		if (await CartModel.findOne(req.body.userId)) {
			const cart = await CartModel.findOneAndUpdate(cart._id, req.body);
			res.status(200).json({ msg: 'Carrinho atualizado.', cart: cart });
		} else {
			const cart = await CartModel.create(req.body);
			res.status(200).json({ msg: 'Carrinho criado com sucesso.', cart: cart });
		}
		res.status(500).send({ error: 'fxGz0R', msg: 'Ops...' });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
