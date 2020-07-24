const { body } = require('express-validator');
const config = require('../../../config');

module.exports = {
  create_todo: () => ([
    body('title')
      .trim()
      .exists()
      .isLength({ min: config.validation.todo.title.min, max: config.validation.todo.title.max })
        .withMessage(`Min length: ${config.validation.todo.title.min}. Max length: ${config.validation.todo.title.max}`),
  ]),
  update_todo: () => ([
    body('id')
      .trim()
      .exists()
      .isInt(),
    body('title')
      .optional()
      .isString()
      .isLength({ min: config.validation.todo.title.min, max: config.validation.todo.title.max })
        .withMessage(`Min length: ${config.validation.todo.title.min}. Max length: ${config.validation.todo.title.max}`),
    body('status')
      .optional()
      .isInt({ min: 0, max: 2 })
        .withMessage('Status must be 0, 1 or 2'),
    body('color')
      .optional()
      .isHexColor()
  ])
}