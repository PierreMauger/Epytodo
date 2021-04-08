import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.SECRET;

var middleware = function(req, res, next) {
    jwt.verify(req.header.token, SECRET, (err, user) => {
    if (err) {
        console.log(err);
        return res.status(400).send({ msg: "No token, authorization denied" });
    }
    req.user = user;
    next();
    }
  );
}

export default middleware;
