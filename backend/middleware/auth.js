const jwt = require("jsonwebtoken");
const db = require('../models')
const { createToken } = require("../utils/auth");

require('dotenv').config()
const secret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: `Unauthorized! ${error}`
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAuth = (req, res, next) => {
  try {
    const token = req.headers["Authorization"].split(" ")[1];
    const email = jwt.verify(token, secret).email;
    req.body.email = email;
    next();
  } catch (error) {
    res.status(401).json({
      message: `Token expired, ${error}`,
    });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.body.refresh_token;
    console.log(refresh_token);
    jwt.verify(refresh_token, secret);

    const user = await db.User.findOne({
      where: { refresh_token },
    });

    const token = createToken(user, 60 * 15);
    const new_refresh_token = createToken(user, 60 * 60 * 72);

    user.refresh_token = new_refresh_token;
    await user.save();

    return res.status(201).json({
      token,
      refresh_token: new_refresh_token,
    });
  } catch (e) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = {
  verifyToken,
  isAuth,
  refreshToken
};