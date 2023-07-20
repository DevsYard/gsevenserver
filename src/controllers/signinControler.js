const LoginModel = require('../models/LoginModel')


exports.signin = async (req, res) => {
	try {
		const data = req.body;

		const user = await LoginModel.find({});
		if (user[0].username == data.username) {
			res.status(200).json(user);
		} else res.status(200).json({ erro: 'O usuário não foi encontrado' });
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
};

