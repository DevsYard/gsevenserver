const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');

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
		}

		req.userId = user._id;
		console.log('User ID: ', req.userId);
		res
			.status(200)
			.json({ message: 'Autenticação bem-sucedida', connection: true });
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
};
