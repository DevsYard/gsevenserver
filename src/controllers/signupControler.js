const CreateAccountModel = require('../models/CreateAccountModel')


exports.signup = async (req, res) => {
	try {
		const newAccount = await CreateAccountModel.create(req.body);
		res.status(201).json(newAccount);
	} catch (error) {
		res.status(500).send(error);
	}
};
