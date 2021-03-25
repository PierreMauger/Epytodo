import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connectDB = function () {
  const con = mysql.createConnection({
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    return con;
  });
};

export default connectDB;
