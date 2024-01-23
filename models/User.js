const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// constructor
const UserSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password :{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'USER'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  salt: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);