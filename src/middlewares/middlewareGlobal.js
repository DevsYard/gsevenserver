exports.middlewareGlobal = (req, res, next) => {
	res.locals.localVariable = 'Valor da variavel local.';
	// console.log('req.csrfToken pelo csrfMiddleware: ', req.csrfToken());
	// res.locals.csrfToken = req.csrfToken();
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
