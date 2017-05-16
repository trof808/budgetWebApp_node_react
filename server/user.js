const db = require('./db');
const redis = require("redis");
const client = redis.createClient();

//ищет пользователя по его id
const findUserById = (req, res, next) => {
  let userId = req.user.identities[0].user_id;
  let sql = `
    SELECT * FROM users WHERE user_id = $1
  `;
  db.query(sql, [userId])
    .then(result => {return result})
    .catch(next);
};

//Проверяет, есть ли пользователь в базе при первом заходе
const checkUserInDb = (req, res, next) => {
  userId = req.user.identities[0].user_id;
  db.query('SELECT * FROM users WHERE user_id = $1', [userId])
    .then(result => {
      console.log(result);
      if(result) {
        console.log(result);
        createNewUser(req, res, next);
      } else {
        console.log(result);
        next();
      }
    })
    .catch(error => {createNewUser(req, res, next)});
};

//Создает нового пользователя при первом заходе
const createNewUser = (req, res, next) => {
  userId = req.user.identities[0].user_id;
  if(req.user.identities[0].isSocial) {
    db.query('INSERT INTO users (user_id, email, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)',
              [userId, req.user._json.email, req.user.nickname, req.user._json.given_name, req.user._json.family_name])
      .then(result => {userStartPage(req, res, next)})
      .catch(error => {res.render('error', {message: 'Ошибка при создании базы', error: error})})
  } else {
    db.query('INSERT INTO users (user_id, email, username) VALUES ($1, $2, $3)', [userId, req.user._json.email, req.user.nickname])
      .then(result => {userStartPage(req, res, next)})
      .catch(error => {res.render('error', {message: 'Ошибка при создании базы', error: error})})
  }

}

const userStartPage = (req, res, next) => {
  client.exists('user_id', (err, reply) => {
    req.session.username = req.user.nickname;
    if(reply === 1) {
      console.log('Такой пользователь уже есть: ' + client.get('user_id'));
      res.redirect(req.session.returnTo || '/user/'+req.user.nickname);
    } else {
      client.set('username', req.user.nickname);
      client.set('user_id', req.user.identities[0].user_id);
      clinet.set('first', true);
      console.log('Пользователь добавлен: ' + client.get('user_id'));
      res.redirect('/user/'+req.user.nickname+'/start');
    }
  });
};

exports.findUserById = findUserById;
exports.createNewUser = createNewUser;
exports.checkUserInDb = checkUserInDb;
