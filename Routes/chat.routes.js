const express = require('express');
const router = express();

const chat = require('../Controllers/chat.controller')

router.get('/chats', chat.getMessage)
router.post('/post-chat', chat.postMessage)
router.post('/find', chat.getMessageById)


module.exports = router
