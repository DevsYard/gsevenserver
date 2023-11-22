const FavoritesModel = require('../models/FavoritesModel');
const AccountModel = require('../models/AccountModel');
const ProductModel = require('../models/ProductModel');

exports.createFavorites = async (req, res) => {
	try {
		const user = await AccountModel.findById(req.body.userId);
		const favProd = { productId: req.body.productId };
		if (!user) {
			res.status(404).send('Usuário não encontrado');
			return;
		}
		let updated = null;
		if (req.body.fav) {
			console.log(user.favorites[0]);

			if (user.favorites[0] !== undefined) {
				const favorite = await FavoritesModel.findById(user.favorites[0]);
				let isFav = false;
				for (let i = 0; i < favorite.favoriteProds.length; i++) {
					if (favorite.favoriteProds[i].productId === favProd.productId) {
						isFav = true;
					}
				}
				if (!isFav) {
					favorite.favoriteProds.push(favProd);
				}
				updated = await favorite.save();
			} else {
				const favorite = await FavoritesModel.create({
					favoriteProds: favProd,
				});
				user.favorites.push(favorite);
				updated = await user.save();
				res.status(200).json({ msg: 'Referência criada', ref: updated });
				return;
			}

			res
				.status(201)
				.json({ msg: 'Seus favoritos foram atualizados.', favorites: updated });
			return;
		} else {
			const favProd = { productId: req.body.productId };

			if (user.favorites[0]._id) {
				const favorite = await FavoritesModel.findById(user.favorites[0]);
				for (let i = 0; i < favorite.favoriteProds.length; i++) {
					if (favorite.favoriteProds[i].productId === favProd.productId) {
						favorite.favoriteProds.splice(i, 1);
						break;
					}
				}
				updated = await favorite.save();
				res.status(200).json({ msg: 'Favorito retirado', item: updated });
				return;
			}
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getFavorites = async (req, res) => {
	try {
		const favorite = await FavoritesModel.findById(req.body.favorites[0]);
		const favoriteProducts = [];

		for (let i = 0; i < favorite.favoriteProds.length; i++) {
			const product = await ProductModel.findById(
				favorite.favoriteProds[i].productId
			);
			if (product) {
				favoriteProducts.push(product);
			}
		}
		res
			.status(200)
			.json({ msg: 'lista atualizada', favorites: favoriteProducts });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};