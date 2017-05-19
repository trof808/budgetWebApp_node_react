'use strict';
const db = require('./db');

const getBanks = (req, res, next) => {
  db.query('SELECT * FROM banks')
    .then(response => res.json(response))
    .catch(next)
};

exports.getBanks = getBanks;
