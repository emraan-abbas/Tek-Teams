const Room = require('../Models/room.model');

// Create Room
exports.createRoom = async (req, res) => {
  try {
    let room = await new Room({
      name: req.name,
      userId: req.userId,
      chatId: req.chatId
    }).save()

    return res.status(200).json({ data: room, message: 'OK' });
  }
  catch (error) {
    console.log("ERROR AT CREATE ROOM = ", error)
    return res.status(401).json({
      message: 'Error at Create Room.',
      error: error,
    });
  }
};
