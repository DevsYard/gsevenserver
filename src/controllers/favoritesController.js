const FavoritesModel = require('../models/FavoritesModel');
const UserModel = require('../models/AccountModel');
const AccountModel = require('../models/AccountModel');

exports.favorites = async (req, res) => {
	try {
		console.log(req.body);
		const user = await AccountModel.findById({ _id: req.body.userId });
		const favorites = await FavoritesModel.findById({
			userId: req.body.userId,
		});
		if (favorites && user._id === req.body.userId) {
			console.log('Favoritos:', favorites);
		} else {
			res.status(201).send({ favorites });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
};
