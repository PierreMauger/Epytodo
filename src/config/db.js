import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let dbStatic = null;

const con = mysql.createConnection({
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
});

function connectToDb() {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) reject(err);
      else {
        dbStatic = con;
        console.log("Connected to db.");
        resolve();
      }
    });
  });
}

function get() {
  return dbStatic;
}

export const db = get;
export const connect = connectToDb;
