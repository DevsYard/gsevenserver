const AccountModel = require('../models/AccountModel');

exports.users = async (req, res) => {
	try {
		const userId = { _id: req.body.userId };
		const update = { bio: req.body.bio, birth: req.body.birth };
		const user = await AccountModel.findOneAndUpdate(userId, update);
		if (!user) {
			res.status(400).json({ msg: 'Não houve retorno' });
		} else {
			res.status(200).json({ msg: 'Atualização realizada.' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
};

exports.profile = async (req, res) => {
	try {
		const user = await AccountModel.findById(req.body.userId);
		if (!user) {
			res.status(400).json({ erro: 'aso$dDp', msg: 'recurso não encontrado.' });
		} else {
			res.status(200).json(user);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
};
