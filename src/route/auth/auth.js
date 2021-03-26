import { Router } from "express";
import { db } from "../../config/db.js";

const app = new Router();

app.post("/register", (req, res) => {
  db().query(
    "INSERT INTO `user` (`email`, `password`, `name`, `firstname`) VALUES (?, ?, ?, ?)",
    [req.body.email, req.body.password, req.body.name, req.body.firstname],
    function (err, rows, fields) {
      console.log(err);
      res.send("OK");
    }
  );
});

export default app;
