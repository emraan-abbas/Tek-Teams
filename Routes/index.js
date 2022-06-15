const express = require('express');
const router = express();

const user = require('./user.routes');
const chat = require('./chat.routes');


router.use('/api', user);
router.use('/api', chat);

module.exports = router
