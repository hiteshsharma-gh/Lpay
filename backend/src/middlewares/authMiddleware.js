import 'dotenv/config';
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authorization = req.headers.Authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(403).json({
      message: 'unauthorized request'
    })
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(403).json({
      message: 'unauthorized request'
    })
  }
}

module.exports = {
  authMiddleware
}
