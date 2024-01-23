const express = require("express");
const cors = require("cors");
const mongo = require('./repository/Db.js');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongo();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to work management application." });
});

require("./routes/routing.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});