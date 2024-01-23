module.exports = app => {
  const users = require("../controllers/UserController.js");

  var router = require("express").Router();
  
  // User
  router.post("/user/signin", users.signIn);
  router.post("/user/test", users.test);

  app.use('/api/', router);
};
