const { body } = require('express-validator');
const PasswordStrange = require('password-validator');
const db = require('../../db');
const config = require('../../../config');

module.exports = {
  'register': () => ([
    body('name')
      .trim()
      .isLength({ min: config.validation.user.name.min, max: config.validation.user.name.max })
        .withMessage(`Min length: ${config.validation.user.name.min}. Max length: ${config.validation.user.name.max}`),
    body('address')
      .trim()
      .exists().withMessage('Address field is required')
      .isLength({ min: config.validation.user.address.min, max: config.validation.user.address.max })
        .withMessage(`Min length: ${config.validation.user.address.min}. Max length: ${config.validation.user.address.max}`),
    body('birthday')
      .trim()
      .exists().withMessage('Birthday fields is required')
      .custom(value => {
        const validator = new RegExp(config.validation.user.birthday.regex);
        return validator.test(value);
      }).withMessage(() => 'Incorrect date format'),
    body('phone')
      .trim()
      .exists().withMessage('Phone fields is required')
      .isLength({ min: config.validation.user.phone.length })
        .withMessage(`Min length: ${config.validation.user.phone.length}. Max length: ${config.validation.user.phone.length}`)
      .custom(value => {
        const validator = new RegExp(/^\d{10}$/);
        return validator.test(value);
      }).withMessage(() => 'Incorrect phone format'),
    body('username')
      .trim()
      .exists().withMessage('Username field is required')
      .isLength({ min: config.validation.user.username.min, max: config.validation.user.username.max })
        .withMessage(`Min length: ${config.validation.user.username.min}. Max length: ${config.validation.user.username.max}`)

      //check username unique
      .custom(value => !Boolean(db.users.find(user => user.username === value)))
        .withMessage(value => `Username ${value} already in use`),
    body('password')
      .trim()
      .exists().withMessage('Password field if required')
      .isLength({ min: config.validation.user.password.min, max: config.validation.user.password.max })
      .withMessage(`Min length: ${config.validation.user.password.min}. Max length: ${config.validation.user.password.max}`)

      //password strange
      .custom(value => {
        const schema = new PasswordStrange();
        schema.has().uppercase()
          .has().lowercase()
          .has().digits()
          .has().not().spaces()
          .has().not().symbols();
        return schema.validate(value);
      }).withMessage('Password must contain uppercase, lowercase and digit chars'),
    body('password_confirmation')
      .trim()

      //password matching
      .custom((value, { req }) => value === req.body.password).withMessage('Passwords dont match')
  ]),
}