import { Router } from "express";
import { db } from "../../config/db.js";

const app = new Router();

app.get("/user/todos", (req, res) => {
  db().query(
    "SELECT * FROM `todo` WHERE `user_id` = (?)",
    [req.body.user_id],
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
  db().query(
    "UPDATE `user` SET email = (?), password = (?), name = (?), firstname = (?) WHERE id = (?)",
    [
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.firstname,
      req.params.id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
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
      }
    }
  );
});

app.delete("/user/:id", (req, res) => {
  db().query(
    "DELETE FROM `user` WHERE `id` = (?)",
    [req.params.id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
        res.status(200).send({
          msg: "Succesfully deleted record number: " + req.params.id,
        });
      }
    }
  );
});

export default app;
