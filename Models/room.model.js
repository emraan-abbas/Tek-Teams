const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  name: String,
  userId: {
    type: Array,
    ref: 'users'
  },
  chatId: {
    type: Array,
    ref: 'chats'
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('rooms', rooomSchema);