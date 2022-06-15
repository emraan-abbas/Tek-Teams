const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    chat:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chats'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('users', userSchema);
