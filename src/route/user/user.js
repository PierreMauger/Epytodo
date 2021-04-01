import { Router } from "express";
import { db } from "../../config/db.js";

const app = new Router();

app.get("/user", (req, res) => {
  db().query("SELECT * FROM `user`", function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send("There was a problem.");
    } else {
      res.send(rows);
    }
  });
});

export default app;
