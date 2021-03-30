import { Router } from "express";
import { db } from "../../config/db.js";
//json web token

const app = new Router();

app.get("/user/todos", (req, res) => {
});

app.get("/user/:id", (req, res) => {
});

app.put("/user/:id", (req, res) => {
});

app.delete("/user/:id", (req, res) => {
});

export default app;
