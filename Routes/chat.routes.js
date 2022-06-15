const express = require('express');
const router = express();

const chat = require('../Controllers/chat.controller')

router.get('/chats', chat.getMessage)


module.exports = router
