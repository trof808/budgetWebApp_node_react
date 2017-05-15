const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
	res.send('Главная страница');
});

route.get('/login', (req, res, next) => {
	res.send('Страница входа');
});

route.get('/logout', (req, res, next) => {
	res.send('Страница выхода');
});

route.get('/polls', (req, res, next) => {
	res.send('Страница опросов');
});

route.get('/user', (req, res, next) => {
	res.send('Страница пользователя');
});

module.exports = route;