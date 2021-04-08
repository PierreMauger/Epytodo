import { Router } from "express";
import { db } from "../../config/db.js";

const app = new Router();

app.get("/todo/:id", (req, res) => {
  db().query(
    "SELECT * FROM `todo` WHERE `id` = (?)",
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

app.post("/todo", (req, res) => {
  db().query(
    "INSERT INTO `todo` (`title`, `description`, `create_at`, `due_time`, `status`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      req.body.title,
      req.body.description,
      req.body.create_at,
      req.body.due_time,
      req.body.status,
      req.user.id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status().send("There was a problem.");
      } else {
        db().query(
          "SELECT * FROM `todo` WHERE `id` = @@Identity",
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

app.put("/todo/:id", (req, res) => {
  db().query(
    "UPDATE `todo` SET title = (?), description = (?), create_at = (?), due_time = (?), status = (?), user_id = (?) WHERE id = (?)",
    [
      req.body.title,
      req.body.description,
      req.body.create_at,
      req.body.due_time,
      req.body.status,
      req.body.user_id,
      req.params.id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(400).send("There was a problem.");
      } else {
        db().query(
          "SELECT * FROM `todo` WHERE `id` = (?)",
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
app.delete("/todo/:id", (req, res) => {
  db().query(
    "DELETE FROM `todo` WHERE `id` = (?)",
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
