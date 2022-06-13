const express = require('express');
const router = express();

const user = require('./user.routes');


router.use('/api', user);

module.exports = router
