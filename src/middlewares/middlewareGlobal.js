const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userSession = async (req, res, next) => {
	try {
		if (req.sessionID) {
			console.log('Session ID: ', req.sessionID);
			next();
		} else {
			res
				.status(500)
				.json({ Erro: '4T1ov6', message: 'É necessario estar logado' });
			return;
		}
	} catch (err) {
		res.status(500).json({ Erro: 'iyr6qh', message: err.message });
	}
};

exports.userInfo = async (req, res, next) => {
	try {
		if (req.body.userId !== '') {
			console.log('===================================');
			console.log('Passando pelo userInfo:', req.body);
			console.log('===================================');
		} else {
			res.status(200).json({ msg: 'Não autorizado.' });
		}
	} catch (err) {
		res.status(500).json({ Erro: 'GMAQiz', message: err.message });
	}
	next();
};

exports.isAuthenticated = (req, res, next) => {
	if (req.userId) {
		next();
	} else {
		console.log('Área logada!');
		res.status(401).json({ message: 'Não autorizado' });
	}
};

exports.cryptograph = (req, res, next) => {
	const saltRounds = 10;
	let password = req.body.password;
	bcrypt.genSalt(saltRounds, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			console.log(hash);
		});
	});
	next();
};
