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
				.json({ msg: 'Carrinho iniciado', Items: { newCart } });
		}
	} catch (error) {
		res.status(500).send({ error: error.message });

	}
};

exports.cartView = async (req, res) => {
	try {
		console.log(req.body)
		const existingCart = await CartModel.findOne({ userId: req.body.userId });
		if(existingCart) {
			res.status(200).send({ msg: 'Carrinho encontrado', cart: existingCart });
		} else {
			res.status(200).json({ msg: 'Não há nada no carrinho.' });
		}
	} catch (error) {
		res.status(500).send({ error: error.message})
	}
}