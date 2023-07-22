const mongoose = require('mongoose');

const CreateProductSchema = new mongoose.Schema({
	productName: { type: String, required: true },
	description: { type: String },
	price: { type: Number, required: true },
	promo: { type: Boolean },
	promoPrice: { type: Number },
	condition: { type: Number },
	img: { type: String },
});

const ProductModel = mongoose.model('Products', CreateProductSchema);

module.exports = ProductModel;
