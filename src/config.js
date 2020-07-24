const user = require('./validation_config/user');
const todo = require('./validation_config/todo');

const config = {
  baseUrl: 'http://localhost',
  port: 3001,

  validation: {
    user,
    todo,
  }
}

module.exports = config;