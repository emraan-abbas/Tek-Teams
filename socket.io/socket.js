// Socket IO

exports.messenger = (io) => {
  io.on('connection', (socket) => {
    console.log('User Connected');

    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });

    socket.on('my message', (msg) => {
      io.emit('my broadcast', `Server: ${msg}`)
    });

  });
};


