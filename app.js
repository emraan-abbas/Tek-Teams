const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./Routes/index');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// CORS
app.use(cors());

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



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tek-Teams is running on Port: ${PORT}`);
});

