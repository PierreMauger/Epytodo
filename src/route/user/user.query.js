import { Router } from "express";
import { db } from "../../config/db.js";
//json web token

const app = new Router();

app.get("/user/todos", (req, res) => {
  db().query("SELECT * FROM `todo`", function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send("There was a problem lol.");
    } else {
      console.log(rows);
      res.status(200).send();
    }
  });
});

app.get("/user/:id", (req, res) => {
  db().query(
    "SELECT * FROM `user` WHERE `id` = (?)",
    [req.params.id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem lol.");
      } else {
        console.log(rows);
        res.status(200).send();
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
        return res.status(500).send("There was a problem lol.");
      } else {
        console.log(rows);
        res.status(200).send();
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
        return res.status(500).send("There was a problem lol.");
      } else {
        console.log("User deleted");
        res.status(200).send();
      }
    }
  );
});
export default app;
