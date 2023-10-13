const mongoose = require('mongoose');
const ProductModel = require('./ProductModel');
const CreateCartSchema = new mongoose.Schema([
	{
		produto: { type: ProductModel, required: false },
		unidades: { type: Number, required: true },
		valorUnitario: { type: Number, required: true },
		userId: { type: String, required: true },
		valorTotal: { type: Number, required: true },
	},
]);

const CartModel = mongoose.model('UserCart', CreateCartSchema);

module.exports = CartModel;
