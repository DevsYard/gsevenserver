const CartModel = require('../models/CartModel');

exports.cartRegister = async (req, res) => {
	try {
		const existingCart = await CartModel.findOne({ userId: req.body.userId });

		if (existingCart) {
			const updatedCart = await CartModel.findOneAndUpdate(
				{ _id: existingCart._id },
				req.body,
				{ new: true }
			);
			res.status(200).json({ msg: 'Carrinho atualizado.', cart: updatedCart });
		} else {
			const newCart = await CartModel.create(req.body);
			res
				.status(200)
				.json({ msg: 'Carrinho criado com sucesso.', cart: newCart });
		}
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
