const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
	try {
		const newUser = req.body;
		const saltRounds = 10;
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(req.body.password, salt, function (err, hash) {
				console.log(hash);
				newUser.password = hash;
				console.log('NewUser:', newUser);
			});
		});
		const newAccount = await AccountModel.create(newUser);
		res.status(201).json(newAccount);
	} catch (error) {
		res.status(500).send(error);
	}
};
