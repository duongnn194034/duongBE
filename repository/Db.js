const mongoose = require("mongoose");
require('dotenv').config();

var connection = function() {
  mongoose.connect(process.env.MONGO_HOST);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Database connected successfully');
  });
}

module.exports = connection;