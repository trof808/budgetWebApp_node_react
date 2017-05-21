'use strict';
const db = require('./db');

const getCards = (req, res, next) => {
  db.query('SELECT * FROM cards')
    .then(response => res.json(response))
    .catch(next)
};

exports.getCards = getCards;
