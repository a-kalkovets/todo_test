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