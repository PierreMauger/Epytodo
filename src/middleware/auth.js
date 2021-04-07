import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.SECRET;

var middleware = function(req, res, next) {
    jwt.verify(req.header.token, SECRET, (err, user) => {
    if (err) {
        return res.sendStatus(403);
    }
    req.user = user;
    next();
    }
  );
}
export default middleware;
