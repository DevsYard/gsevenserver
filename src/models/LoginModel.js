const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true, minlength: 8 },
});

const LoginModel = mongoose.model('Login', LoginSchema)

module.exports = LoginModel