const router = require('express').Router();

router.use('/auth', require('./auth'));

router.use('/todo', require('./todo'));

module.exports = router;