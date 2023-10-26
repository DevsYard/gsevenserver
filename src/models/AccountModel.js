const mongoose = require('mongoose');

const CreateAccountSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true, minlength: 8 },
	admin: { type: Boolean, required: true },
	birth: { type: Date, required: false },
	bio: { type: String, required: false },
	name: { type: String, required: false },
	avatar: { type: String, required: false },
	favorites: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Favorites',
		},
	],
});

const AccountModel = mongoose.model('UsersAccount', CreateAccountSchema);

module.exports = AccountModel;
