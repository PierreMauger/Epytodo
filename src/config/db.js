import mysql from "mysql2";

const connectDB = function () {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    return con;
  });
};

export default connectDB;
