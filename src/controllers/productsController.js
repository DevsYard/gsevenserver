const ProductModel = require('../models/ProductModel');

exports.createProduct = async (req, res) => {
	try {
		const newProduct = await ProductModel.create(req.body);
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.showProducts = async (req, res) => {
	try {
		const products = await ProductModel.find({}).exec();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).send(error);
	}
};
