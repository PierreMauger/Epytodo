import { Router } from "express";
import { db } from "../../config/db.js";

const app = new Router();

app.get("/user", (req, res) => {
  db().query("SELECT * FROM `user`", function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send("There was a problem.");
    } else {
      console.log(rows);
      res.status(200).send();
    }
  });
});

export default app;
