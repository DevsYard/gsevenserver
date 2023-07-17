const LoginModel = require('../models/LoginModel')


exports.signin = (req, res) => {
	const data = req.body
	
	LoginModel.create({
		username: data.username,
		password: data.password
	}).then(dados => console.log(dados))
	.catch(err => console.error(err))
	
	res.send('Seus dados:', data)
}

