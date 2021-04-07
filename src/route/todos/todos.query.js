import { Router } from "express";
import { db } from "../../config/db.js";

const app = new Router();

app.get("/todo/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ msg: "bad ID" });
    return;
  }
  db().query(
    "SELECT * FROM `todo` WHERE `id` = (?)",
    [],
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
  const title = req.body.title;
  const description = req.body.description;
  const create_at = req.body.create_at;
  const due_time = req.body.due_time;
  const status = req.body.status;
  const user_id = req.body.user_id;

  if (!title || !description || !create_at || !due_time || !status || !user_id) {
    res.status(400).send({ msg: "bad JSON" });
    return;
  }
  db().query(
    "INSERT INTO `todo` (`title`, `description`, `create_at`, `due_time`, `status`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      create_at,
      due_time,
      status,
      user_id,
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
  const title = req.body.title;
  const description = req.body.description;
  const create_at = req.body.create_at;
  const due_time = req.body.due_time;
  const status = req.body.status;
  const user_id = req.body.user_id;
  const id = req.body.params.id;

  if (!title || !description || !create_at || !due_time || !status || !user_id || !id) {
    res.status(400).send({ msg: "bad JSON" });
    return;
  }
  db().query(
    "UPDATE `todo` SET title = (?), description = (?), create_at = (?), due_time = (?), status = (?), user_id = (?) WHERE id = (?)",
    [
      title,
      description,
      create_at,
      due_time,
      status,
      user_id,
      id,
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
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ msg: "bad ID" });
    return;
  }
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
