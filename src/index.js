import express from "express";
import dotenv from "dotenv";

import con from "./config/db.js";
import auth from "./route/auth/auth.js";

dotenv.config();
const PORT = process.env.FRONT_PORT;

const dataBase = con();
const app = express();

auth(app, dataBase);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
