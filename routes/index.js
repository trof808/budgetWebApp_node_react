const express = require('express');
const passport = require('passport');
const route = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');

var options = {}

route.get('/', (req, res, next) => {
	res.render('index', {options: options});
});

route.get('/login', (req, res, next) => {
	res.render('login', {options: options});
});

route.get('/logout', (req, res, next) => {
	req.logout();
  res.redirect('/');
});

route.get('/polls', (req, res, next) => {
	request('http://elections.huffingtonpost.com/pollster/api/charts.json?topic=2016-president', (error, response, body) => {
		if(!error && response.statusCode == 200) {
			let polls = JSON.parse(body);
			res.render('polls', {options: options, user: req.user, polls: polls});
		} else {
			render('error');
		}
	})
});

route.get('/user', (req, res, next) => {
	let user = {
		nickname: 'Nikita',
		picture: 'http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg'
	}
	res.render('user', {user: req.user});
});

module.exports = route;
