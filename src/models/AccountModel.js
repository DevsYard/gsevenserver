const mongoose = require('mongoose');

const CreateAccountSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true, minlength: 8 },
	admin: { type: Boolean, required: true },
});

const AccountModel = mongoose.model('UsersAccount', CreateAccountSchema);

module.exports = AccountModel;
