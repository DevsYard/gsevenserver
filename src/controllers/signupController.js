const AccountModel = require('../models/AccountModel');

exports.signup = async (req, res) => {
	try {
		const newAccount = await AccountModel.create(req.body);
		res.status(201).json(newAccount);
	} catch (error) {
		res.status(500).send(error);
	}
};
