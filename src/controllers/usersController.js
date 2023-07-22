const AccountModel = require('../models/AccountModel');

exports.users = async (req, res, next) => {
	try {
		const users = await AccountModel.find({}).exec();
		console.log(users);
		res.status(200).json({ msg: 'usuários capturados' });
	} catch (err) {
		res.status(500).send(err.message);
	}
};
