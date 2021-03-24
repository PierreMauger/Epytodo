/*

const express = require("express");
const connection = require("./config/db");
const app = express();

require("dotenv").config();
const PORT = process.env.FRONT_PORT;

db = connection.connectionDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/xD/", (req, res) => {
  con.query("SELECT id FROM user", function (err, rows, fields) {
    res.send(fields);
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

*/

import express from "express";
import con from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.FRONT_PORT;

let connectDB = con();

const app = express();

//console.log("hello");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/xD/", (req, res) => {
  connectDB.query("SELECT id FROM user", function (err, rows, fields) {
    res.send(fields);
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
