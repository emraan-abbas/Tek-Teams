const Message = require('../Models/message.model');
const User = require('../Models/user.model');


// Initiate Chat Message
exports.postMessage = async (req, res) => {
  try {
    let message = await new Message({
      messageContent: req.msg,
      senderId: req.senderId
    }).save()

    // return res.status(200).json({ data: message, message: 'Message Sent' });
  }
  catch (error) {
    console.log("ERROR AT INITIATE CHAT = ", error)
    // return res.status(401).json({
    //   message: 'Error at Initiate Chat.',
    //   error: error,
    // });
  }
};