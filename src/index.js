import express from "express";
import dotenv from "dotenv";
import * as db from "./config/db.js";
import authRouter from "./route/auth/auth.js";
import pkg from 'body-parser';

const { json } = pkg;

dotenv.config();
const PORT = process.env.FRONT_PORT;

async function main() {
  const app = express();

  await db.connect();

  app.use(json());
  app.use(authRouter);

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
}

main();
