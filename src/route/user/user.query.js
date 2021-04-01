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
        res.send("There was a problem.");
      } else {
        res.send(rows);
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
        res.send("There was a problem.");
      } else {
        res.send(rows);
      }
    }
  );
});

app.put("/user/:id", (req, res) => {
  db().query(
    "INSERT INTO `todo` (`title`, `description`, `create_at`, `due_time`, `status`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      req.body.title,
      req.body.description,
      req.body.create_at,
      req.body.due_time,
      req.body.status,
      req.params.id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send("There was a problem.");
      } else {
        res.send();
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
        res.send("There was a problem.");
      } else {
        res.send({
          msg: "Succesfully deleted record number: " + req.params.id,
        });
      }
    }
  );
});

export default app;
