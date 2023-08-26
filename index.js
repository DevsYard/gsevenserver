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

const session = require('express-session');
const MongoStore = require('connect-mongo');
// const flash = require('connect-flash');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const routes = require('./routes');

// const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const { middlewareGlobal } = require('./src/middlewares/middlewareGlobal');

// app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
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
		secure: false,
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
		sameSite: 'lax',
	},
});

app.use(config);
// app.use(flash());

// app.use(middlewareGlobal);	

app.use(routes);

app.on('done', () => {
	app.listen(3001, () => {
		console.log(
			'Rodando em https://gsevenserver-d3e65ic7d-gate7.vercel.app:3001'
		);
	});
});
