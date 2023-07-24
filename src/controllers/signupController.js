const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 15);
		const newUser = {
			username: req.body.username,
			password: hash,
			admin: req.body.admin,
		};
		const newAccount = await AccountModel.create(newUser);
		res.status(201).json({ msg: 'Usuário criado com sucesso.' });
	} catch (error) {
		res.status(500).send({ Erro: '3StzZb', msg: error.message });
	}
};

