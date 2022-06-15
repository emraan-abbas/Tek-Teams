const Chat = require('../Models/chat.model');
const User = require('../Models/user.model');


// Initiate Chat Message
exports.postMessage = async (req, res) => {
  try {
    let message = await new Chat({
      message: req.msg,
      senderId: req.senderId,
      reciverId: req.reciverId
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

// Get Messages
exports.getMessage = async (req, res) => {
  try {
    let allMessages = await Chat.find().populate('senderId')
    if (allMessages) {
      // console.log(allMessages)
      return res.status(201).json({
        message: "ALL Messages = ",
        allMessages
      })
    }
    else {
      console.log('No Messages Found')
      return res.status(400).json({
        message: "NO MESSAGES "
      })
    }
  }
  catch (error) {
    console.log('ERROR AT GET MESSAGES = ', error);
    return res.status(401).json({
      message: 'Error at Get Message',
      error
    });
  }
};

// Get Message By ID
exports.getMessageById = async (req, res) => {
  try {
    let messageById = await Chat.find({ id: { $in: [senderId, reciverId] } });
    if (messageById) {
      return res.status(200).json({
        message: 'List of All Related Messages',
        messageById
      });
    }
    else {
      return res.status(401).json({
        message: 'No Related Messages Found.'
      })
    }

  }
  catch (error) {
    console.log('ERROR AT GET MESSAGES BY ID = ', error);
    return res.status(401).json({
      message: 'Error at Get Message by ID',
      error
    })
  }
};
