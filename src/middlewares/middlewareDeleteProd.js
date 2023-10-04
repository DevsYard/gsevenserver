const AccountModel = require('../models/AccountModel');

exports.userAdminConfirmation = async (req, res, next) => {
	try {
		console.log('passando pela confirmação.');
		const _id = req.body.userId;
		console.log('UserId: ', _id);
		const user = await AccountModel.findOne({ _id }).exec();

		const id = user._id;

		if (_id.toString() === user._id.toString()) {
			if (user.admin) {
				console.log('confirmado!');
				next();
			} else {
				console.log('não confirmado!');
				res
					.status(401)
					.json({ Erro: 'xZTNrj', message: 'Você não tem autorização.' });
			}
		} else {
			res
				.status(401)
				.json({ Erro: 'jEejD4', message: 'Você precisa estar logado.' });
		}
	} catch (err) {
		res.status(500).json({ Erro: 'iy4fet', message: err.message });
	}
};
