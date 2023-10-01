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
		console.log(req.params);
		const product = await ProductModel.findById({ _id: req.params.id });
		console.log('Produto:', JSON.stringfy(product));
		res.status(200).json(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
