const AccountModel = require('../models/AccountModel');
const bcrypt = require('bcrypt');

exports.middlewareGlobal = (req, res, next) => {
	res.locals.localVariable = 'Valor da variavel local.';
	// console.log('req.csrfToken pelo csrfMiddleware: ', req.csrfToken());
	// res.locals.csrfToken = req.csrfToken();
	next();
};

exports.userSession = async (req, res, next) => {
	try {
		const username = req.body.username;
		const userInfo = await AccountModel.findOne({ username }).exec();
		const response = {
			id: userInfo._id,
			admin: userInfo.admin,
		};
		res.json(response);
	} catch (err) {
		res.status(500).json({ Erro: 'iyrooh', message: err.message });
	}

	next();
};

// exports.checkCsrfError = (err, next) => {
// 	console.log('entrei pelo checkCsrfError');
// 	if (err && err.code === 'EBADCSRFTOKEN') {
// 		return res.send('Bad CSRF.').redirect('/signin');
// 	}
// 	console.log('passei pelo checkCsrfError');
// 	next();
// };

// exports.checkTokenMiddleware = (req, res, next) => {
// 	if (req.cookies.token) {
// 		const token = req.cookies.token;
// 	}
// 	if (token) {
// 		console.log(req);
// 		const admin = req.body.admin;
// 		admin ? res.redirect('/adminhome') : res.redirect('/userhome');
// 		next();
// 	} else {
// 		res.redirect('/signin');
// 	}
// 	console.log('não achei nada pra continuar');
// 	next();
// };

exports.isAuthenticated = (req, res, next) => {
	if (req.userId) {
		next();
	} else {
		alert('Área logada!');
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
