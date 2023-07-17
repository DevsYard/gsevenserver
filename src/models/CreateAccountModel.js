const mongoose = require('mongoose')

const CreateAccountSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean
})

const CreateAccountModel = mongoose.model('CreateAccount', CreateAccountSchema)

module.exports = CreateAccountModel