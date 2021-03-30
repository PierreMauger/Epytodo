import { Router } from "express";
import { db } from "../../config/db.js";
//json web token

const app = new Router();

app.get("/todo/:id", (req, res) => {
});

app.post("/todo", (req, res) => {
});

app.put("/todo/:id", (req, res) => {
});

app.delete("/todo/:id", (req, res) => {
});

export default app;
