const AccountModel = require('../models/AccountModel');

exports.signin = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await AccountModel.findOne({
			username,
			password,
		}).exec();

		console.log(user, username, password);

		if (
			user != null &&
			user.username === username &&
			user.password === password
		) {
			req.userId = user._id;
			console.log('User ID: ', req.userId);
			res
				.status(200)
				.json({ message: 'Autenticação bem-sucedida', connection: true });
		} else {
			res.status(200).json({ message: 'Usuário não encontrado' });
		}
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
	next();
};
