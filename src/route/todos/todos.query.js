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
        res.send("There was a problem.");
      } else {
        res.send(rows);
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
      req.body.user_id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send("There was a problem.");
      } else {
        console.log(fields);
        res.status(200).send();
      }
    }
  );
});

app.put("/todo/:id", (req, res) => {});

app.delete("/todo/:id", (req, res) => {
  db().query(
    "DELETE FROM `todo` WHERE `id` = (?)",
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
