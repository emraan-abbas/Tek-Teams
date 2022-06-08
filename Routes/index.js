const express = require('express');
const router = express();

const user = require('./user.routes');


router.use('/user', user);

module.exports = router
