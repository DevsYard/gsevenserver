const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	productName: { type: String, required: true },
	price: { type: Number, require: true },
	promo: { type: Boolean, required: true },
	promoPrice: { type: Number },
	condition: { type: Boolean },
	img: { type: String },
	fav: { type: Boolean, required: true },
});

const FavoriteModel = mongoose.model('Favorites', FavoritesSchema);

module.exports = FavoriteModel;
