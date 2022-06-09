const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./Routes/index');
const dotenv = require('dotenv');
const { messenger } = require('./socket.io/socket')

const app = express();
const server = http.createServer(app); // Express use CreateServer under the hood to create Server
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// CORS
app.use(cors());


// DOT-ENV
dotenv.config();

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/tekteams', {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Database Connected !');
  })
  .catch((error) => {
    console.log('Error at DB Connection !', error);
    process.exit();
  });

// All Routes
app.use('/tekteams', routes)

// Server Creation
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Tek-Teams is running on Port: ${PORT}`);
});


// Socket IO
messenger(io);

// io.on('connection', (socket) => {
//   console.log('User Connected');

//   socket.on('disconnect', () => {
//     console.log('User Disconnected');
//   });

//   socket.on('my message', (msg) => {
//     io.emit('my broadcast', `Server: ${msg}`)
//   })

// });

