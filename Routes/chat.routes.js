const express = require('express');
const router = express();

const chat = require('../Controllers/message.controller')

router.get('/chats')
router.get('/chats/:id') // Get messages by room id
router.post('/chats/message', chat.postMessage) //Initiate
router.post('/chats/:id/message') // Send message in specific room
router.put('/chats/:id/mark-read') // Mark conversation read
router.delete('room/:id') // Delete by Room ID
router.delete('message/:id') // Delete by Message ID

module.exports = router
