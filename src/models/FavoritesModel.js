const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
	favoriteProds: [],
});

const FavoriteModel = mongoose.model('Favorites', FavoritesSchema);

module.exports = FavoriteModel;
