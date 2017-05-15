'use strict'

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

const config = require('./config');

dotenv.load();

const routes = require('./routes/index');

var strategy = new Auth0Strategy({
	domain:       process.env.AUTH0_DOMAIN,
	clientID:     process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL:  'http://localhost:8094/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
// profile has all the information from the user
	return done(null, profile);
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: config.cookieSecret,
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.use((req, res, next) => {
	var err = new Error('not found');
	err.status(404);
	err.next();
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {message: err.message, error: err})
});

app.listen(8094);
