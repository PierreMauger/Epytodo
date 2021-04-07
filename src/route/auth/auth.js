import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../config/db.js";

const app = new Router();

const SECRET = process.env.SECRET;

app.post("/register", (req, res) => {
  db().query(
    "INSERT INTO `user` (`email`, `password`, `name`, `firstname`) VALUES (?, ?, ?, ?)",
    [req.body.email, req.body.password, req.body.name, req.body.firstname],
    function (err, rows, fields) {
      if (err) {
        console.log(err.sqlMessage);
        res.status(400).send({ msg: "user already exist" });
      } else {
        var token = jwt.sign({ id: rows.id }, SECRET, {
          expiresIn: 86400, // expires in 24 hours
        });
        req.header.token = token;
        console.log("User created");
        res.status(200).send({ token: token });
      }
    }
  );
});

app.post("/login", (req, res) => {
  db().query(
    "SELECT * FROM `user` WHERE (`email`, `password`) = (?, ?)",
    [req.body.email, req.body.password],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(400).send("There was a problem.");
      }
      if (rows.length) {
        var token = jwt.sign({ id: rows[0].id }, SECRET, {
          expiresIn: 86400, // expires in 24 hours
        });
        req.header.token = token;
        console.log("Token created");
        res.status(200).send({ token: token });
      } else {
        console.log("Failed to create token.");
        res.status(400).send({ msg: "Invalid Credentials" });
      }
    }
  );
});

export default app;
