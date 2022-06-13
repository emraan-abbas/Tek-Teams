const user = require('../Controllers/user.controller')
const chat = require('../Controllers/message.controller')


// Socket IO
exports.messenger = (io) => {

  io.on('connection', (socket) => {
    console.log('User Connected');

    socket.on('New Message', (data) => {
      console.log(data)
      chat.postMessage(data);
    })

  });

};

