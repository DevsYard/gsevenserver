const ProductModel = require('../models/ProductModel');

exports.createProduct = async (req, res) => {
	try {
		const newProduct = await ProductModel.create(req.body);
		res.status(201).send(newProduct);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.showProducts = async (req, res) => {
	try {
		const products = await ProductModel.find({}).exec();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.productDetails = async (req, res) => {
	try {
		const product = await ProductModel.findById({ _id: req.params.id });
		res.status(200).json(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const productId = req.body.productId;
		const product = await ProductModel.deleteOne({ _id: productId });
		console.log('Id do usuário:', req.body.userId);
		console.log('Id do Produto:', productId);
		console.log('Produto apagado:', product);
		res.status(200).send({ msg: 'O produto selecionado foi apagado.' });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.getProduct = async (req, res) => {
	try {
		const product = await ProductModel.findById({ _id: req.body.id });
		product
			? res.status(200).json(product)
			: res.json({
					error: 'Bpk1RN',
					msg: 'Não foi possível encontrar o produto.',
			  });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.editProduct = async (req, res) => {
	try {
		if (req.body.session.admin) {
			const changes = await ProductModel.findByIdAndUpdate(req.params.id, {
				productName: req.body.productName,
				description: req.body.description,
				price: req.body.price,
				promo: req.body.promo,
				promoPrice: req.body.promoPrice,
				condition: req.body.condition,
				img: req.body.img,
			});
			changes
				? res.status(200).json({ msg: 'As mudanças foram salvas.' })
				: res.json({
						error: 'pxsDUS',
						msg: 'Não foi possível realizar a alteração.',
				  });
		} else {
			res.status(401).json({
				error: '0Xp8UT',
				msg: 'Você precisa estar logado como admin.',
			});
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
};