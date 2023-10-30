const FavoritesModel = require('../models/FavoritesModel');
const AccountModel = require('../models/AccountModel');

exports.createFavorites = async (req, res) => {
	try {
		const user = await AccountModel.findById(req.body.userId);
		if (!user) {
			res.status(404).send('Usuário não encontrado');
			return;
		}
		if (req.body.fav) {
			const favProd = { productId: req.body.productId };
			let updated = null;

			if (user.favorites[0]._id) {
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
				await user.save();
				res.status(200).json({ msg: 'Referência criada', ref: favorite });
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
				await favorite.save();
				res.status(200).json({ msg: 'Favorito retirado', item: favProd });
				return;
			}
		}

		const favProd = { productId: req.body.productId };
		let updated = null;

		if (user.favorites[0]._id) {
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
			const favorite = await FavoritesModel.create({ favoriteProds: favProd });
			user.favorites.push(favorite);
			await user.save();
			res.status(200).json({ msg: 'Referência criada', ref: favorite });
			return;
		}

		res
			.status(201)
			.json({ msg: 'Seus favoritos foram atualizados.', favorites: updated });
		return;
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};