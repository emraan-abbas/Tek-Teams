const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    message: String,
    senderId: mongoose.Types.ObjectId,
    reciverId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('chats', chatSchema);
