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
        return res.status(500).send("There was a problem.");
      } else {
        console.log(rows);
        res.status(200).send();
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
      req.params.id,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem.");
      } else {
        console.log(rows);
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
        return res.status(500).send("There was a problem.");
      } else {
        console.log("Todo deleted");
        res.status(200).send();
      }
    }
  );
});
export default app;
