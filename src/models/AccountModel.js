const mongoose = require('mongoose');

const CreateAccountSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true, minlength: 8 },
	admin: { type: Boolean, required: true },
	birth: { type: Date, required: false },
	bio: { type: String, required: false },
	name: { type: String, required: false },
});

const AccountModel = mongoose.model('UsersAccount', CreateAccountSchema);

module.exports = AccountModel;
