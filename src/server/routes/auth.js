const router = require('express').Router();
const validation = require('./validations/user');
const validate = require('./validations/validate');
const user = require('../models/user');
const db = require('../db');

router.post('/register',
  validation.register(),
  validate,
  (request, response, next) => {
    const newUser = user.createUser(request.body);
    const id = db.users.push(newUser) - 1;
    const token = user.generateToken(id);
    return response.json({
      token,
    });
  }
);

router.post('/login',
  (request, response, next) => {
    const userId = db.users.findIndex(user => user.username === request.body.username);
    if (userId >= 0) {
      const isPasswordMatch = user.isPasswordMatch(db.users[userId], request.body.password);
      if (isPasswordMatch) {
        const token = user.generateToken(userId);
        return response.json({
          token,
        });
      }
    }
    return response.status(401).json({
      errors: {
        message: 'Username or password incorrect',
      }
    })
  }
);

module.exports = router;