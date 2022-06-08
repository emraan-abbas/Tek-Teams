const express = require('express');
const router = express();

const user = require('../Controllers/user.controller');

router.post('/signup', user.signUp)
router.post('/login', user.login)
router.put('/edit/:id', user.edit)
router.delete('/delete/:id', user.delete)

module.exports = router;
