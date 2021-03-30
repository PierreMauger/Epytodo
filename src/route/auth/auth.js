import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../config/db.js";

const app = new Router();

app.post("/register", (req, res) => {
  db().query(
    "INSERT INTO `user` (`email`, `password`, `name`, `firstname`) VALUES (?, ?, ?, ?)",
    [req.body.email, req.body.password, req.body.name, req.body.firstname],
    function (err, rows, fields) {
      console.log(err);
      res.send("OK");
    }
  );
});

app.post("/login", (req, res) => {
  db().query(
    "SELECT name FROM `user` WHERE name = (?)",
    [req.body.name],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem lol.");
      }
      if (rows.length) {
        var token = jwt.sign({ id: rows.id }, "secret", {
          expiresIn: 86400, // expires in 24 hours
        });
        console.log("token created");
        res.status(200).send({ auth: true, token: token });
      } else {
        console.log("failed to create token");
        res.status(400).send();
      }
    }
  );
});

export default app;
