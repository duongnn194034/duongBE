const User = require('../models/User.js')
const crypto = require('crypto');

const hashPassword = function(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

const generate_token = function(length) {
  //edit the token allowed characters
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];  
  for (var i=0; i<length; i++) {
      var j = (Math.random() * (a.length-1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join("");
}

// Sign In
exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (hashPassword(req.body.password, user.salt) === user.password) {
        res.send({ "token": user.token, "role": user.role });
      } else {
        res.send(400).send({ "message": "Wrong Password!" })
      }
    } else {
      res.status(400).send({ "message": "Wrong email!" })
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err)
  }
}

exports.test = async (req, res) => {
  try {
    let salt = crypto.randomBytes(16).toString('hex');
    const user = new User({
      email: "test@gmail.com",
      password: hashPassword("123456", salt),
      name: "Duong",
      salt: salt,
      role: "ADMIN",
      token: generate_token(32)
    });
    await user.save();
    res.status(201).send({ "token": token });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}