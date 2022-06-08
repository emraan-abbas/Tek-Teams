const express = require('express');
const router = express();

const user = require('../Controllers/user.controller');

router.post('/signup', user.signUp)
router.post('/login', user.login)

module.exports = router;
