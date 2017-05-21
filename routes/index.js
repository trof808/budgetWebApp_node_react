'use strict'
const express = require('express');
const passport = require('passport');
const route = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');
const redis = require("redis");
const client = redis.createClient();

const user = require('../server/user');
const banks = require('../server/banks');
const cards = require('../server/cards');

var env = {
	AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: 'http://localhost:8094/callback'
}

route.get('/banks/api', banks.getBanks);
route.get('/cards/api', cards.getCards);

route.get('/', (req, res, next) => {
	if(req.user) {
		res.redirect('/polls');
	} else {
		console.log(req);
		res.render('index', {env: env, loguser: req.session});
	}
});

route.get('/user/:username/start', (req, res, next) => {
	res.render('start');
});

route.get('/user/:username', ensureLoggedIn, user.findUserById);

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
			console.log(req.user);
			res.render('polls', {env: env, user: req.user, polls: polls});
		} else {
			render('error');
		}
	})
});

route.get('/callback',
	passport.authenticate('auth0', { failureRedirect: '/' }),
	user.checkUserInDb,
	(req, res) => {
	  res.redirect(req.session.returnTo || '/user/'+req.user.nickname);
});

module.exports = route;
