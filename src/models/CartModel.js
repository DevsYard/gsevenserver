const mongoose = require('mongoose');
const ProductModel = require('./ProductModel');

const Product = ProductModel
const product = new Product();

const CreateCartSchema = new mongoose.Schema({
	produto: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	unidades: { type: Number, required: true },
	valorUnitario: { type: Number, required: true },
	userId: { type: String, required: true },
	valorTotal: { type: Number, required: true },
});

const CartModel = mongoose.model('UserCart', CreateCartSchema);

module.exports = CartModel;
