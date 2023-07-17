require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('done')
  })
  .catch(err => alert("Ocorreu um erro na conexão com o Banco de Dados", err))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const cors = require('cors')
const https = require('https')
const fs = require('fs')  
const routes = require('./routes')
const helmet = require('helmet')
const Tokens = require('csrf')
const { middlewareGlobal} = require('./src/middlewares/middlewareGlobal')


app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(Tokens)

const tokens = new Tokens()
const secret = tokens.secretSync()
console.log('SecretSync: ', secret)
const token = tokens.create(secret)


const sessionOptions = session({
  secret: token,
	store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
	resave: false,
	saveUninitialized: false,
	cookie: {
    maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
	},
});


app.use(sessionOptions)
app.use(flash())

app.use(middlewareGlobal)

app.use(routes)

app.on('done', () => {
  app.listen(3001, () => {
    console.log('Rodando em http://localhost:3001')
  })
})
