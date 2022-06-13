const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  messageContent: String,
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('chats', chatSchema);
