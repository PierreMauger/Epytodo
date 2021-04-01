import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../config/db.js";

const app = new Router();

app.post("/register", (req, res) => {
  db().query(
    "INSERT INTO `user` (`email`, `password`, `name`, `firstname`) VALUES (?, ?, ?, ?)",
    [req.body.email, req.body.password, req.body.name, req.body.firstname],
    function (err, rows, fields) {
      if (err) {
        console.log(err.sqlMessage);
        res.send({ msg: "user already exist" });
      } else {
        var token = jwt.sign({ id: rows.id }, "secret", {
          expiresIn: 86400, // expires in 24 hours
        });
        console.log("User created");
        res.send({ token: token });
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
        return res.send("There was a problem.");
      }
      if (rows.length) {
        var token = jwt.sign({ id: rows.id }, "secret", {
          expiresIn: 86400, // expires in 24 hours
        });
        console.log("Token created");
        res.send({ token: token });
      } else {
        console.log("Failed to create token.");
        res.send({ msg: "Invalid Credentials" });
      }
    }
  );
});

export default app;
