const express = require('express');
const router = express();

const user = require('../Controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/signup', user.signUp)
router.post('/login', user.login)
router.get('/all', user.getAllUsers)
router.get('/get/:id', user.getUser)
router.put('/edit/:id', user.edit)
router.delete('/delete/:id', user.delete)

module.exports = router;
