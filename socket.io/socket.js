
const chat = require('../Controllers/chat.controller')

// Socket IO
exports.messenger = (io) => {


  io.on('connection', (socket) => {
    console.log('User Connected');
    // console.log(socket.id);

    socket.on('New Message', (data, id) => {
      console.log(data)
      chat.postMessage(data);

      socket.broadcast.emit('From Server', { data: data.msg })
      // socket.broadcast.to(data.senderId).emit('From Server', { data: data.msg })
      // console.log('SocketId = ', data.senderId)
    })
  });
};

