import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../config/db.js";
import bcrypt from "bcrypt"

const app = new Router();

const SECRET = process.env.SECRET;

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const firstname = req.body.firstname;

  if (!email || !password || !name || !firstname) {
    res.status(400).send({ msg: "bad JSON" });
    return;
  }
  const hash = bcrypt.hashSync(password, 10);
  db().query(
    "INSERT INTO `user` (`email`, `password`, `name`, `firstname`) VALUES (?, ?, ?, ?)",
    [email, hash, name, firstname],
    function (err, rows, fields) {
      if (err) {
        console.log(err.sqlMessage);
        res.status(400).send({ msg: "user already exist" });
      } else {
        db().query(
          "SELECT * FROM `user` WHERE (`email`) = (?)",
          [email],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
              return res.status(400).send("There was a problem.");
            } else {
              var token = jwt.sign({ id: rows[0].id }, SECRET, {
                expiresIn: 86400, // expires in 24 hours
              });
              req.header.token = token;
              console.log("User created");
              res.status(200).send({ token: token });
            }
          }
        );
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send({ msg: "bad JSON" });
    return;
  }
  db().query(
    "SELECT * FROM `user` WHERE (`email`) = (?)",
    [email],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(400).send("There was a problem.");
      }
      if (rows.length && bcrypt.compareSync(password, rows[0].password)) {
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
