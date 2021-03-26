const auth = function (app, dataBase) {
  app.get("/register", (req, res) => {
    // dataBase.query("SELECT id FROM user", function (err, rows, fields) {
    //   res.send(fields);
    // });
    res.send("LOL");
  });
};

export default auth;
