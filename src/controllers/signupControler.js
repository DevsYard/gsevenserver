const CreateAccountModel = require('../models/CreateAccountModel')


exports.signup = (req, res) => {
	const data = req.body
	
	CreateAccountModel.create({
		username: data.username,
		password: data.password,
		admin: data.admin
	}).then(dados => console.log(dados))
	.catch(err => console.error(err))
	
	res.send('Seus dados:', data)

}
