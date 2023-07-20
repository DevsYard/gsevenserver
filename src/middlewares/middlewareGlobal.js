exports.middlewareGlobal = (req, res, next) => {
	res.locals.localVariable = 'Valor da variavel local.';
	// csrfMiddleware()
	next();
}

// function csrfMiddleware(req, res, next) {
// 	console.log('req.csrfToken pelo csrfMiddleware: ', req.csrfToken());
// 	res.locals.csrfToken = req.csrfToken();
// 	console.log('passei pelo csrfMiddleware');
// 	next();
// }

// exports.checkCsrfError = (err, req, res, next) => {
//   console.log('entrei pelo checkCsrfError')
//   if(err && err.code === "EBADCSRFTOKEN") {
//     return res.send("Bad CSRF.")
//   }
//   console.log('passei pelo checkCsrfError')
//   next()
// }


// exports.checkTokenMiddleware = (req, res, next) => {
// 	const token = req.cookies.token
// 	if (token) {
//     res.redirect('/userhome');
//     next()
// 	} else {
// 		res.redirect('/signin')
// 	}
// }

