const { body } = require('express-validator');
const PasswordStrange = require('password-validator');
const db = require('../../db');
const config = require('../../../config');

module.exports = {
  'register': () => ([
    body('name')
      .trim()
      .isLength({ min: config.validation.name.min, max: config.validation.name.max })
        .withMessage(`Min length: ${config.validation.name.min}. Max length: ${config.validation.name.max}`),
    body('address')
      .trim()
      .exists().withMessage('Address field is required')
      .isLength({ min: config.validation.address.min, max: config.validation.address.max })
        .withMessage(`Min length: ${config.validation.address.min}. Max length: ${config.validation.address.max}`),
    body('birthday')
      .trim()
      .exists().withMessage('Birthday fields is required')
      .custom(value => {
        const validator = new RegExp(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/);
        return validator.test(value);
      }).withMessage(() => 'Incorrect date format'),
    body('phone')
      .trim()
      .exists().withMessage('Phone fields is required')
        .withMessage(`Min length: ${config.minNameLength}. Max length: ${config.maxNameLength}`)
      .custom(value => {
        const validator = new RegExp(/^\d{3}\-\d{3}\-\d{4}$/);
        return validator.test(value);
      }).withMessage(() => 'Incorrect phone format. Must be: 999-999-9999'),
    body('username')
      .trim()
      .exists().withMessage('Username field is required')
      .isLength({ min: config.validation.username.min, max: config.validation.username.max })
        .withMessage(`Min length: ${config.validation.username.min}. Max length: ${config.validation.username.max}`)

      //check username unique
      .custom(value => !Boolean(db.users.find(user => user.username === value)))
        .withMessage(value => `Username ${value} already in use`),
    body('password')
      .trim()
      .exists().withMessage('Password field if required')
      .isLength({ min: config.validation.password.min, max: config.validation.password.max })
      .withMessage(`Min length: ${config.validation.password.min}. Max length: ${config.validation.password.max}`)

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