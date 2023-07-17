const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
  username: String,
  password: String
})

const LoginModel = mongoose.model('Login', LoginSchema)

module.exports = LoginModel