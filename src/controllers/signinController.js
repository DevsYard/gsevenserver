const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signin = async (req, res) => {
	try {
		const username = req.body.username;
		const user = await AccountModel.findOne({ username }).exec();

		if (!user) {
			return res
				.status(401)
				.json({ Erro: 'lmnh0P', message: 'Usuário ou senha não encontrado' });
		}
		const passwordMatch = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!passwordMatch) {
			res
				.status(401)
				.json({ Erro: 'HYziby', message: 'Email ou senha incorretos.' });
		} else {
			req.userId = user._id;
			const token = jwt.sign({ userId: req.userId }, '_GaTe5evEn-eNTErpr1ze_', {
				expiresIn: 300,
			});
			
			res.status(200).json({ auth: true, token: token, admin: user.admin });
		}
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
};
