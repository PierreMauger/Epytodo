require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.FRONT_PORT;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
