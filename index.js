require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
	.connect(process.env.CONNECTIONSTRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('done');
		app.emit('done');
	})
	.catch((err) =>
		alert('Ocorreu um erro na conexão com o Banco de Dados', err)
	);

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cors = require('cors');
const routes = require('./routes');

const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const { middlewareGlobal } = require('./src/middlewares/middlewareGlobal');
const session = require('express-session');

app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: true,
		referrerPolicy: { policy: ['origin', 'same-origin'] },
	})
);

const url = 'http://localhost:3000'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: url,
		optionsSuccessStatus: 204
	})
);

const config = session({
	name: 'appgate7',
	// secret: token,
	secret: 'as#RfR3ve¨%64¨jhGF3f4bvc3fb',
	store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
	resave: true,
	saveUninitialized: true,
	cookie: {
		path: '/',
		secure: false,
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: false,
		sameSite: 'strict',
	},
});

app.use(config);
// app.use(flash());

// app.use(middlewareGlobal);	

app.use(routes);

app.on('done', () => {
	app.listen(3001, () => {
		console.log(
			'Rodando em https://localhost:3001'
		);
	});
});
