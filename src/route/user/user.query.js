import { Router } from "express";
import { db } from "../../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const app = new Router();

app.get("/user/todos", (req, res) => {
  db().query(
    "SELECT * FROM `todo` WHERE `user_id` = (?)",
    [req.user.id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
        res.status(200).send(rows);
      }
    }
  );
});

app.get("/user/:id", (req, res) => {
  db().query(
    "SELECT * FROM `user` WHERE `id` = (?)",
    [req.params.id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
        res.status(200).send(rows);
      }
    }
  );
});

app.put("/user/:id", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const firstname = req.body.firstname;
  const id = req.params.id;

  if (!email || !password || !name || !firstname || !id) {
    res.status(400).send({ msg: "bad JSON" });
    return;
  }
  const hash = bcrypt.hashSync(password, 10);
  db().query(
    "UPDATE `user` SET email = (?), password = (?), name = (?), firstname = (?) WHERE id = (?)",
    [
      email,
      hash,
      name,
      firstname,
      id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
        db().query(
          "SELECT * FROM `user` WHERE `id` = (?)",
          [id],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
              res.status(400).send("There was a problem.");
            } else {
              res.status(200).send(rows);
            }
          }
        );
      }
    }
  );
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ msg: "bad ID" });
    return;
  }
  db().query(
    "DELETE FROM `user` WHERE `id` = (?)",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
        db().query(
            "DELETE FROM `todo` WHERE `user_id` = (?)",
            [id],
            function (err, rows, fields) {
              if (err) {
                console.log(err);
                res.status(400).send("There was a problem.");
              }
            }
          );
        res.status(200).send({
          msg: "Succesfully deleted record number: " + req.params.id,
        });
      }
    }
  );
});

export default app;
