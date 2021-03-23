require("dotenv").config();

const express = require("express");
const mysql2 = require("mysql2");
const app = express();
const port = process.env.FRONT_PORT;

const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/xD/", (req, res) => {
  con.query("SELECT id FROM user", function (err, rows, fields) {
    res.send(fields);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
