const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.middlewareGlobal = async(req, res, next) => {
	try {
		const username = req.body.username;
		const userInfo = await AccountModel.findOne({ username }).exec();
		token = jwt.sign({ userId: req.userId }, '_GaTe5evEn-eNTErpr1ze_', {
			expiresIn: 300,
		});
		userInfo.id ? res.status(200).json({token: token, message: "Parece ok"}) : res.status(401);
	} catch (err) {
		res.status(500).json({ Erro: 'QRlID0', message: err.message });
	}
	next();
};

exports.userSession = async (req, res, next) => {
	try {
		if(req.sessionID) {
			console.log("Passei no userSession:", req.sessionID)
			res.username = req.username
			next()
		}
		else{
			console.log('Deu ruim.')
			res.status(500).json({Erro: 'É necessatio estar logado'})
			return
		}
	} catch (err) {
		res.status(500).json({ Erro: 'iyr6qh', message: err.message });
	}
};

exports.userInfo = async (req, res, next) => {
	try {
		console.log("Passando pelo userInfo:", res.sessionID)
	} catch(err) {
		res.status(500).json({Erro: 'GMAQiz', message: err.message})
	}
	next()
}

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
