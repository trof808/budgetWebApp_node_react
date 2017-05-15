const express = require('express');
const passport = require('passport');
const route = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');
const redis = require("redis");
const client = redis.createClient();

var env = {
	AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: 'http://localhost:8094/callback'
}

route.get('/', (req, res, next) => {
	if(req.user) {
		res.redirect('/polls');
	} else {
		res.render('index', {env: env});
	}
});

route.get('/user/:username/start', (req, res, next) => {
	res.render('start', {user: user});
});

route.get('/user/:username', (req, res, next) => {
	res.send('Ваш провиль, ' + req.user.nickname);
});

route.get('/login', (req, res, next) => {
	res.render('login', {env: env});
});

route.get('/logout', (req, res, next) => {
	req.logout();
  res.redirect('/');
});

route.get('/polls', ensureLoggedIn, (req, res, next) => {
	request('http://elections.huffingtonpost.com/pollster/api/charts.json?topic=2016-president', (error, response, body) => {
		if(!error && response.statusCode == 200) {
			let polls = JSON.parse(body);
			console.log(req.user.identities[0].user_id);
			res.render('polls', {env: env, user: req.user, polls: polls});
		} else {
			render('error');
		}
	})
});

route.get('/user', (req, res, next) => {
	console.log(req.user);
	res.render('user', {user: req.user});
});

route.get('/callback',
	passport.authenticate('auth0', { failureRedirect: '/' }),
	(req, res, next) => {
		client.exists('user_id', (err, reply) => {
			if(reply === 1) {
				console.log('Такой пользователь уже есть: ' + client.get('user_id'));
				next();
			} else {
				client.set('user_id', req.user.identities[0].user_id);
				console.log('Пользователь добавлен: ' + client.get('user_id'));
				res.redirect('/user/'+req.user.nickname+'/start');
			}
		});
	},
	(req, res) => {
	  res.redirect(req.session.returnTo || '/user/'+req.user.nickname);
});

module.exports = route;
