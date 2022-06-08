const express = require('express');
const router = express();

const user = require('../Controllers/user.controller');

router.post('/signup', user.signUp)
router.post('/login', user.login)
router.get('/all', user.getAllUsers)
router.put('/edit/:id', user.edit)
router.delete('/delete/:id', user.delete)

module.exports = router;
