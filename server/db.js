'use strict';
const pg = require('pg');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'budget', //env var: PGDATABASE
  password: '585465077m', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

exports.query = (sql ,values, singleItem) => {

  return new Promise((resolve, reject) => {

    pool.connect((err, clinet, done) => {
      if(err) return reject(err);else {

        try {
          clinet.query(sql, values, (err, result) => {
            done();
            if(err) {
              reject(err);
            } else {
              resolve(singleItem ? result.rows[0] : result.rows);
            }

          })
        } catch (e) {
          done();
          reject(err)
        }

      }
    })

  })


}
