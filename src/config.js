const config = {
  baseUrl: 'http://localhost',
  port: 3001,

  validation: {
    name: {
      min: 2,
      max: 64,
    },
    address: {
      min: 2,
      max: 64,
    },
    birthday: {
      regex: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
    },
    phone: {
      length: 10,
    },
    username: {
      min: 2,
      max: 32,
    },
    password: {
      min: 8,
      max: 64,
    },
  }
}

module.exports = config;