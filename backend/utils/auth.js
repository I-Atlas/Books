const jwt = require("jsonwebtoken")

require('dotenv').config()
const secret = process.env.JWT_SECRET

const createToken = (user, expiresIn) => {
  try {
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      secret,
      { expiresIn }
    )

    return token;
  } catch (e) {
    console.log(`createToken error: ${e}`);
    throw { status: 500, message: e.message };
  }
}

module.exports = {
  createToken,
}