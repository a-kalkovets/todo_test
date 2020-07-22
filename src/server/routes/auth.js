const router = require('express').Router();
const validation = require('./validations/user');
const validate = require('./validations/validate');
// const db = require('../db');

router.post('/register',
  validation.register(),
  validate,
  (request, response, next) => {
    response.json({
      token: 'token',
    })
  });

module.exports = router;