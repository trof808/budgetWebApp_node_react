const express = require('express');
const route = express.Router();

var options = {}

route.get('/', (req, res, next) => {
	res.render('index', {options: options});
});

route.get('/login', (req, res, next) => {
	res.render('user', {options: options});
});

route.get('/logout', (req, res, next) => {
	res.send('Страница выхода');
});

route.get('/polls', (req, res, next) => {
	res.render('polls', {user: user});
});

route.get('/user', (req, res, next) => {
	let user = {
		nickname: 'Nikita',
		picture: 'http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg'
	}
	res.render('user', {user: user});
});

module.exports = route;
